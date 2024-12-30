const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

router.get("/register", (req, res) => {
    res.render('register');
})

router.post("/register",
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "invalid data input"
            })
        }

        const { email, password } = req.body;

        const hashPass = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            email,
            password: hashPass,
        })
        res.json(newUser)
    })

router.get("/login", (req, res) => {
    res.render('login');
})

router.post("/login",
    body("email").trim().isEmail(),
    body('password').trim().isLength({ min: 5 }),

    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return  res.status(400).json({
                errors: errors.array,
                message: "data invalid"
            })
        }
        const { email, password } = req.body;
        const userdata = await userModel.findOne({
            email: email
        })
        if (!userdata) {
         return   res.status(400).json({
                errors: errors.array,
                message: "email and password is wrong"
            })
        }
        const matchPass = bcrypt.compare(password, userdata.password);
        if (!matchPass) {
          return  res.status(400).json({
                errors: errors.array(),
                message: "email and password is wrong"
            })
        }
        // Generate token for not login again and again
        const token = jwt.sign({
            userId: userdata._id,
            email: userdata.email
        },
            process.env.JWT_SECRET
        )
        res.cookie("token",token)
        res.send("you logged in")
    }
)

module.exports = router;
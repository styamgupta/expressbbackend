const express = require("express");
const router = express.Router();
const authmiddleware = require('../middleware/auth')


router.get("/home",authmiddleware, (req, res) => {
    res.render('index');
})

module.exports = router;
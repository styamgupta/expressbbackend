const express = require("express");
const userRouter = require('./routes/user.routes')
const indexRouter = require('./routes/index.routes')
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db')
connectDB();
var cookieParser = require('cookie-parser')

const app = express();
app.set('view engine', "ejs");
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
 
app.use("/", indexRouter)
app.use("/user", userRouter)

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})
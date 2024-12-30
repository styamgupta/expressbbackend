const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[3,"user email contain must be 3 character"],
    },
    password:{
        type:String,
        require:true,
        trim:true,
        minlength:[5,"user password contain must be 5 character"],


    }
})
const User = mongoose.model("User", userSchema)
module.exports = User
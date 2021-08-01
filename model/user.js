const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    details:{
        type:Array,
    },
    order:{
        type:Array
    },
    role:{
        type:String,
        default:"user"
    }
})

mongoose.model("User",userSchema)
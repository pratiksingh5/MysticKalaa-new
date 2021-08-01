const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
},{timestamps:true})

mongoose.model("Product",productSchema)
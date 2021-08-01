const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const {uri} = require("./keys/key")

mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})
require('./model/user.js')
require('./model/product.js')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/product'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})

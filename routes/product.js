const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Product =  mongoose.model("Product")
const User = mongoose.model("User")

router.get('/products',(req,res)=>{
    Product.find()
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
})

router.post('/createproduct',(req,res)=>{
    const {title,pic,price,category} = req.body 
    if(!title || !price || !pic || !category){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    // req.user.password = undefined
    const post = new Product({
        title,
        photo:pic,
        category,
        price
    })
    post.save().then(result=>{
        res.json({post:result,message:"Your Product Added"})

    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/users',(req,res)=>{
    User.find()
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
})

router.post('/chekout/:id',(req,res)=>{
    const userId = req.params.id
    const data = req.body
    
    // const CData = req.body.item
    // const AData = [{address:"nahri k naka",state:"rajasthan",city:"jaipur",pin:"12345"}]
    // const {CData,userId} = req.body
    User.findByIdAndUpdate(userId,
    { "$push": { "order": data } },
    { "new": true, "upsert": true },
    function (err, managerparent) {
        if (err) throw err;
        console.log(managerparent);
        res.send("done")
    }
);

})

router.post('/updatestatus',(req,res)=>{
    var UserId = req.body.userId
    var OrderId = req.body.itemId
    var Status = req.body.status
    // const personQuery = {
    //    _id: "60f5b1c3df931b94733149f0"  
    // }

    // const itemID = "909";

    User.findOne({_id:UserId}).then(item => {
        const audioIndex = item.order.map(i => i.id).indexOf(OrderId);
       item.order[audioIndex].status = Status;
       item.markModified('order');
       item.save()
       .then(user=>{
                res.json({message:"Updated successfully",user})
                })
            .catch(err=>{
            console.log(err)
            })
                });
})

router.post('/paymentstatus',(req,res)=>{
    var UserId = req.body.userId
    var OrderId = req.body.itemId
    var Status = req.body.status
    // const personQuery = {
    //    _id: "60f5b1c3df931b94733149f0"  
    // }

    // const itemID = "909";

    User.findOne({_id:UserId}).then(item => {
        const audioIndex = item.order.map(i => i.id).indexOf(OrderId);
       item.order[audioIndex].payment = Status;
       item.markModified('order');
       item.save()
       .then(user=>{
                res.json({message:"Updated successfully",user})
                })
            .catch(err=>{
            console.log(err)
            })
                });
})


module.exports = router

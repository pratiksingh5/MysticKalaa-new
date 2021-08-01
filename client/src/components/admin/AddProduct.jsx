import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import  bcrypt  from 'bcryptjs';

function AddProduct() {
    const [title,setTitle] = useState("")
    const [price,setPrice] = useState("")
    const [pic,setPic] = useState("")
    const [category,setCategory] = useState("")
    const param = useParams()
    const history = useHistory()
    useEffect(()=>{
        var user = JSON.parse(localStorage.getItem('user'))
        console.log(bcrypt.compareSync(param.name,user.role))
        if(!bcrypt.compareSync(param.name,user.role)){
            history.push("/")
        }
    },[param,history])
    const AddPrdct = async()=>{
        var tempPicUrl = pic.trim()
        var ArrayedPicUrl = tempPicUrl.split("/")
        var DIndex = ArrayedPicUrl.indexOf("d")
        var OrginalPicUrl =  `https://drive.google.com/uc?id=${ArrayedPicUrl[DIndex + 1]}`
        try{
            const response = await fetch('/createproduct',{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    title,
                    price,
                    pic:OrginalPicUrl,
                    category
                })
            })
            await response.json()
            toast.success("Product Added Successfully", {
                position: "bottom-right",
                autoClose: 5000,
                pauseOnHover: true,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <>
        
        <div className="py-12 pb-12">
            
                    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
                    
                            <div className="pb-3 pt-3" style={{backgroundColor:'#f5f5f5',textAlign:'center'}}>
                                <h2 className="text-2xl font-semibold" >Add Product</h2>
                            </div>
                            <div className="md:flex">
                                    <div className="w-full p-4 px-5 py-5 ">
                                        
                                                <span >Title</span>
                                                <div className="relative pb-5"> 
                                                    <input type="text" name="name" value={title} className="border h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-1 text-sm" placeholder="Title" onChange={(e)=>setTitle(e.target.value)} /> 
                                                </div>
                                                <span >Price</span>
                                                <div className="relative pb-5">
                                                 <input type="text" name="mail" value={price} className="border h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-1 text-sm" placeholder="Price" onChange={(e)=>setPrice(e.target.value)} /> 
                                                 </div>
                                                <span >Image Link</span>
                                                <div className="relative pb-5"> 
                                                <input type="text" name="mobile" value={pic} className="border h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-1 text-sm" placeholder="https://Image-Link.com/" onChange={(e)=>setPic(e.target.value)} /> 
                                                </div>
                                                <span >Category</span>
                                                <div className="relative pb-5"> 
                                                <input type="text" name="password" value={category} className="border h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-1 text-sm" placeholder="Category" onChange={(e)=>setCategory(e.target.value)} />
                                                </div>
                                                
                                            <button type="button" style={{backgroundColor:'#EE3364',width:'100%'}} className="h-12  font-medium text-xs text-white" onClick={()=>AddPrdct()} >Add</button>
                                            <button type="button" className="h-12 w-60 text-pink-500 text-s font-medium"> <a href="/admin"> Go to Admin Panel</a></button> </div>
                                    
                                    </div>
                            </div>
                    </div>
                    </>
    )
}

export default AddProduct

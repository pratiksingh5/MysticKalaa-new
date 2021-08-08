import React, { useState } from 'react'
import { toast,ToastContainer } from 'react-toastify';
function Checkout() {
    var User = JSON.parse(localStorage.getItem('user'))
    // var Token = localStorage.getItem('jwt')
    var Cart = JSON.parse(localStorage.getItem('items'))
    const [address,setAddress] = useState("")
    const [aprt,setAprt] = useState("")
    const [zip,setZip] = useState("")
    const [city,setCity] = useState("")
    const [state,setState] = useState("")

    const CheckOut = ()=>{
        fetch(`/chekout/${User._id}`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                items:Cart,
                details:{address,aprt,zip,city,state},
                status:"placed",
                discount:"TRYNEW",
                payment:"Processing",
                id: Date.now()
            })
        }).then(res=>res.json())
        .then(data=>{
            
        }).catch(err=>{
            console.log(err)
        })

        toast.success("Order Place Succefully", {
            position: "bottom-right",
            autoClose: 5000,
            pauseOnHover: true,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            });
            localStorage.setItem('items',JSON.stringify([]))
    }

    return (
        <div className="checkout-hr-div" >
        <ToastContainer></ToastContainer>
            <div className="py-12">
                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
                    <div className="pb-3 pt-3" style={{backgroundColor:"#f5f5f5",textAlign:'center'}}>
                        <h2 className="text-2xl font-semibold" >Address Details</h2>
                    </div>
                    <div className="md:flex ">
                        <div className="w-full p-4 px-5 py-5 ">
                        
                        <span >Customer Information</span>
                            <div className="relative pb-5"> 
                            <input type="text" name="mail" defaultValue={User.email} className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="E-mail"  /> 
                            </div>
                            <span>Shipping Address</span>
                            <div className="grid md:grid-cols-2 md:gap-2"> 
                            <input type="text" name="mail"  defaultValue={User.name} className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="name*" /> 
                            
                            </div> 
                            <input type="text" name="mail" value={address} className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Address*" onChange={(e)=>setAddress(e.target.value)} />
                            <input type="text" name="mail" value={aprt} className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Apartment, suite, etc. (optional)" onChange={(e)=>setAprt(e.target.value)} />
                            <div className="grid md:grid-cols-3 md:gap-2"> 
                            <input type="text" name="mail" value={zip} className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Zipcode*" onChange={(e)=>setZip(e.target.value)} />
                            <input type="text" name="mail" value={city} className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="City*" onChange={(e)=>setCity(e.target.value)} /> 
                            <input type="text" name="mail" value={state} className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="State*" onChange={(e)=>setState(e.target.value)} /> 
                            </div>
                            <input type="text" name="mail" defaultValue={User.phone} className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Phone Number*" />
                            <div className="flex justify-between items-center pt-2"> 
                            <button type="button" style={{backgroundColor:"#EE3364",width:"100%"}} className="h-12  font-medium text-xs text-white" onClick={()=>{
                                CheckOut()

                            }} >Proceed to Pay</button> </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="qr-div">
                        <div className="qr-image"></div>
                     
                        <h1>99833252672</h1>
                    
                        <div className="qr-info">
                            Scan the QR code to Confirme the payment and Send the Screen Shot to our 
                           <a href="https://api.whatsapp.com/send?phone=916363036395&text=Hey%2C%20Here%20is%20my%20Payment%20Screen%20Shot%F0%9F%98%8A" style={{color:'green'}}> Whatsapp no.</a>
                            
                        </div>
                </div>
        </div>

    )
}

export default Checkout

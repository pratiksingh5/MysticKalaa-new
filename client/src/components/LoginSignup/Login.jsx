import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
function Login() {
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")
    const history = useHistory()
    const Login = ()=>{
        fetch("/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password:pass,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
               console.log(data.error)
               toast.error(data.error, {
            position: "bottom-right",
            autoClose: 5000,
            pauseOnHover: true,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            });
           }
           else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               toast.success(data.message, {
            position: "bottom-right",
            autoClose: 5000,
            pauseOnHover: true,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            });
            history.push("/cart")
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="py-12 pb-12">
        <ToastContainer></ToastContainer>
                    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
                            <div className="pb-3 pt-3" style={{backgroundColor:'#f5f5f5',textAlign:'center'}}>
                                <h2 className="text-2xl font-semibold" >Log In</h2>
                            </div>
                            <div className="md:flex">
                                    <div className="w-full p-4 px-5 py-5 ">
                                        
                                            
                                                
                                                <span >Email</span>
                                                <div className="relative pb-5">
                                                 <input type="text" name="name" value={email} className="border h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-1 text-sm" placeholder="Name" onChange={(e)=>setEmail(e.target.value)} /> 
                                                 </div>
                                                
                                                <span >Password</span>
                                                <div className="relative pb-5"> 
                                                <input type="text" name="password" value={pass} className="border h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-1 text-sm" placeholder="Password" onChange={(e)=>setPass(e.target.value)} />
                                                </div>
                                                
                                            <button type="button" style={{backgroundColor:'#EE3364',width:'100%'}} className="h-12  font-medium text-xs text-white" onClick={()=>Login()} >Log In</button>
                                            <button type="button" className="h-12 w-60 text-pink-500 text-s font-medium"> <a href="/signup"> Don't Have Account? Create</a></button> </div>
                                    
                                    </div>
                            </div>
                    </div>
    )
}

export default Login

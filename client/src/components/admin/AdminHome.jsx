import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom';
import bcrypt from 'bcryptjs'

function AdminHome() {
    const [adminData,setAdminData] = useState([])
    const [orderData,setOrderData] = useState([])
    const [isOpened,setIsOpened] = useState(false)
    const [orderStatus,setOrderStatus] = useState("")
    const [isUpdated,setIsUpdated] = useState(false)
    const [filteredOrderData,setFilteredOrderData] = useState([])
    var PrQuantity = []
    var TotalPrice = [] 
    const history = useHistory()
    const param = useParams()
    useEffect(()=>{
        var user = JSON.parse(localStorage.getItem('user'))
        console.log(bcrypt.compareSync(param.name,user.role))
        if(!bcrypt.compareSync(param.name,user.role)){
            history.push("/")
        }

        async function fetchAdmingData(){
      
      try{
        const response = await fetch('/users')
        const data = await response.json()
        
        setAdminData(data.posts)
        setIsUpdated(false)
        // console.log(data.posts)
      }
      catch(err){
        console.log(err)
      }
    }
    
    fetchAdmingData()
    },[isUpdated])
    const UpdateOrderStatus = async({id,_id})=>{
        try{
            const response = await fetch('/updatestatus',{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    userId:_id,
                    itemId: id,
                    status:orderStatus
                })
            })
            const data = await response.json()
            setIsUpdated(true)
            toast.success("Status Updated", {
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

    const UpdatePaymentStatus = async({id,_id})=>{
        try{
            const response = await fetch('/paymentstatus',{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    userId:_id,
                    itemId: id,
                    status:"Done"
                })
            })
            const data = await response.json()
            setIsUpdated(true)
            toast.success("Status Updated", {
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
        <div className="orderContainer">
        <a href={`/admin/${param.name}/addproduct`}>
            <button style={{width:'100px',height:'40px',backgroundColor:"#ee3364",color:'white'}} >ADD Product</button>
        </a>
        <section className="orders light-section">
            <div className="container mx-auto pt-12">
                <h1 className="font-bold text-lg mb-4">All orders</h1>
                <table className="w-full table-auto bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Orders</th>
                            <th className="px-4 py-2 text-left">Customer</th>
                            <th className="px-4 py-2 text-left">Address</th>
                            <th className="px-4 py-2 text-left">status</th>
                            <th className="px-4 py-2 text-left">Placed at</th>
                            <th className="px-4 py-2 text-left">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody id="orderTableBody">
                        {/* single Order */}
                        {
                            adminData.map(({details,email,name,order,password,phone,role,_id,})=>{
                                {/* console.log(order) */}
                                const NewAdminData = order.filter((f)=> {return f.status !== "Completed"})
                                return(
                                    <React.Fragment key={_id}>
                                    {
                                        NewAdminData.map(({details,discount,id,items,payment,status})=>{
                                    
                                    var item = [...new Map(items.map(item => [item._id, item])).values()]
                                            
                                            return (
                                                <tr key={id}>
                            <td className="border px-4 py-2 text-green-900">
                                <p onClick={()=>{
                                    setIsOpened(true)
                                    setOrderData(items)
                                    setFilteredOrderData(item)
                                }} >{id} </p>
                                <div> {""} </div>
                            </td>
                            <td className="border px-4 py-2">{name}/{phone}/{email}</td>
                            <td className="border px-4 py-2">{details.address} </td>
                            <td className="border px-4 py-2">
                                <div className="inline-block relative w-64">
                                    <form action="/admin/order/status" method="POST">
                                    <h3 style={{color:"#ee3364"}} >{status} </h3>
                                        <input type="hidden" name="orderId" value=" order._id " />
                                        <select name="status" 
                                        onChange={(e)=>{setOrderStatus(e.target.value)}}
                                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                            <option value="Placed">
                                                Placed</option>
                                            <option value="Confirmed">
                                                Confirmed</option>
                                            <option value="Shipped">
                                                Shipped</option>
                                            <option value="Delivered">
                                                Delivered
                                            </option>
                                            <option value="Completed">
                                                Completed
                                            </option>
                                        </select>
                                        <button type="button"
                                        onClick={()=>UpdateOrderStatus({id,_id})}
                                         style={{backgroundColor:'#EE3364',width:'50px',height:"20px"}} className="h-12  font-medium text-xs text-white"  >Update</button>
                                    </form>
                                    <div
                                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </td>
                            <td className="border px-4 py-2">
                                Time of Payment
                            </td>
                            <td className="border px-4 py-2">
                                {payment}
                                <button type="button"
                                        onClick={()=>UpdatePaymentStatus({id,_id})}
                                         style={{backgroundColor:'#EE3364',width:'50px',height:"20px",marginLeft:"10px"}} className="h-12  font-medium text-xs text-white"  >Done</button>
                            </td>
                        </tr>
                                            )
                                        })
                                    }
                                    
                        </ React.Fragment>
                                )
                            })
                        }
                        
                        {/* single Order */}
                    </tbody>
                </table>
            </div>
        </section>    

        <div className="modal" style={ isOpened ? {display:'flex'} : {display:'none'}} onClick={()=>setIsOpened(false)} >
            <div className="acutal-modal">
            <div className="actual-modal-up">

                {
                    filteredOrderData.map(({category,photo,price,title,_id})=>{
                        var Quantity = orderData.filter((f)=> f._id === _id).length
                PrQuantity.push({
                    Quantity,
                    _id:_id
                })
                TotalPrice.push(parseInt(price)*Quantity)
                        return(
                            
                            <div key={_id} className="admin-product-modal" >
                                <img src={photo} alt="" />
                                <h4>{title} </h4>
                                <p>{price} </p>
                            </div>
                                                        
                        )
                    })
                }
                </div>
                <div className="admin-total-price">
                    <h1> Total Price:</h1>

                    <span>
                        {TotalPrice.reduce((a, b) => a + b, 0)}
                    </span>
                </div>
                    {/* Total Price */}
                    {/* TotalPrice.reduce((a, b) => a + b, 0) */}
                
            </div>
        </div>

      </div>
    )
}

export default AdminHome

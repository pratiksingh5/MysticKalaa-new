import React from 'react'
import { useHistory } from 'react-router-dom';
import {toast} from 'react-toastify'

function Cart(props) {
    var Carts = JSON.parse(localStorage.getItem('items'));
    var User = JSON.parse(localStorage.getItem('user'))
    var Token = localStorage.getItem("jwt")
    const history = useHistory()
    if(Carts){

        var NCart = [...new Map(Carts.map(item => [item._id, item])).values()]
    }
        var PrQuantity = []
        var TotalPrice = []
    
    
    return (
        <>
        

        <div className="cartContainer">
        <div className="cartheading">
          <span>PRODUCT</span>
          <span>PRICE</span>
          <span>QUANTITY</span>
        </div>
        
        {
            Carts
            ?
            NCart.map(({title,price,photo,category,_id},i)=>{
                var Quantity = Carts.filter((f)=> f._id === _id).length
                PrQuantity.push({
                    Quantity,
                    _id:_id
                })
                TotalPrice.push(parseInt(price)*Quantity)
                
                return (
                    <div className="cartelem" key={_id} >
                        <div className="elem">
                            <img
                            src={photo}
                            alt=""
                            />
                            <span>{title} </span>
                        </div>
                        <div className="elem">
                            <span>${parseInt(price)*Quantity} </span>
                        </div>
                        <div className="elem" style={{justifyContent:"space-around"}}>
                            <button id="minus" onClick={()=>props.RemoveFromCart({_id})} >-</button>
                            <span>{Quantity} </span>
                            <button id="minus" onClick={()=>props.AddToCart({title,price,photo,category,_id})} >+</button>

                        </div>
                    </div>
                )
            })
            :
            <>
            <h1 style={{fontSize:"30px"}}>You Cart is empty <a href="/" style={{color:"#ee3364"}} >Shop Something</a> </h1>
            </>
        }
        
    
    

        
      </div>
      <hr />
      {
          Carts
          ?
          <>
          <div id="summary">
      {/* {console.log("total", TotalPrice.reduce((a, b) => a + b, 0))} */}
        <h2>Cart totals</h2>
        {
            
            NCart.map(({title,price,photo,category,_id},i)=>{
                var Quantity = Carts.filter((f)=> f._id === _id).length
                PrQuantity.push({
                    Quantity,
                    _id:_id
                })
                return (
                    <div className="item" key={_id} >
                    <span>{title} {"  "} X {Quantity} </span>
                    <span>${parseInt(price)*Quantity} </span>
                    </div>
                )
                
                })
        }
       
        
        <hr />
        <div className="item total">
          <strong><span>TOTAL</span></strong>

          <strong> <span>${
            TotalPrice.reduce((a, b) => a + b, 0)
          } </span></strong>
        </div>
        <hr />
        <button onClick={()=>{
            if(!User && !Token){
                
                toast.error("You need to Login", {
            position: "bottom-right",
            autoClose: 5000,
            pauseOnHover: true,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            });
            }else{
                console.log(Carts)
                history.push('/checkout')
            }
        }} >PROCEED TO CHECKOUT</button>
      </div>
      
        <br /><br />
          </>
          :
          <>
          <br /><br /><br /><br /><br /><br /><br />
          </>
      }
      

</>
    )
}

export default Cart

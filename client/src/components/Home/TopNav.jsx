import React, { useEffect, useState } from 'react'
import Logo1 from '../images/logo1.png'

function TopNav({cartLen}) {

  const [user,setUser] = useState([])
  const [token,setToken] = useState("")
  

  useEffect(()=>{
    var User = JSON.parse(localStorage.getItem('user'))
    var Token = localStorage.getItem('jwt')
    if(User && Token){

      setUser(User)
      setToken(Token)
      
    }
  },[])           
    
    return (
        <>
            <nav>
        <a href="/" style={{textDecoration:'none',color:'black'}}>
        <div className="logo">

          <img src={Logo1} alt="" />
          <h5>Mystic<span>कला</span></h5>
          
        </div>
        </a>
        <div className="links">
            <a href={(user && token) ? "/cart" : "/login" }>
            {
              (user && token)
              ?
              user.name
              :
              "Login"
            }
          </a>
          <a href="" onClick={(e)=>{
            e.preventDefault()
            localStorage.removeItem('user')
            localStorage.removeItem('jwt')
            window.location.reload()
          }} >
            {
              (user && token)
              ?
              "Logout"
              :
              ""
            }
          </a>
          <a href="/cart"><span id="cart"> <i className="ri-handbag-line"></i>{cartLen} </span></a>
        </div>
      </nav>        
        </>
    )
}

export default TopNav

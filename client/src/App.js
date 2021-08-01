import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import TopNav from './components/Home/TopNav';
import Banner from './components/Home/Banner';
import Category from './components/Home/Category';
import TopSelling from './components/Home/TopSelling';
import About from './components/Home/About';
import Products from './components/products page/Products';
import Login from './components/LoginSignup/Login';
import Signup from './components/LoginSignup/Signup';
import Cart from './components/Cart/Cart';
import Product from './components/products page/Product';
import AddProduct from './components/admin/AddProduct';
import { createContext, useEffect, useState } from 'react';
import Contact from './components/Home/Contact';
import Footer from './components/Home/Footer';
import { toast,ToastContainer } from 'react-toastify';
import Checkout from './components/LoginSignup/Checkout';
import AdminHome from './components/admin/AdminHome';
export const productData = createContext()
function App() {
  const [data,setData] = useState([])
  
  // localStorage.setItem('items',[{}])
  var NavCart = localStorage.getItem('items')

  var TopNavCart = JSON.parse(NavCart)
  const [cartLen,setCartLen] = useState(NavCart ? TopNavCart.length : 0)
  var Carts = []
  useEffect(()=>{
    if(!TopNavCart){
      localStorage.setItem('items',JSON.stringify([]))
    }
    async function fetchData(){
      
      try{
        const response = await fetch('/products')
        const data = await response.json()
        
        setData(data.posts)
      }
      catch(err){
        console.log(err)
      }
    }
    
    fetchData()
  },[])

  
  const AddToCart = ({title,price,photo,category,_id})=>{
        if(localStorage.getItem('items')){
            Carts = JSON.parse(localStorage.getItem('items'));
        }
            Carts.push({title,price,photo,category,_id});
            localStorage.setItem('items', JSON.stringify(Carts));
            
            console.log("item Added",Carts.length)
            setCartLen(Carts.length)
            toast.dark('🛒 Item Added, Go to 👉 Cart ', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
  }

  const RemoveFromCart = ({_id})=>{
    if(localStorage.getItem('items')){
            var Carts = JSON.parse(localStorage.getItem('items'));
        }
        const found = Carts.find((i)=> i._id === _id)
        const id = Carts.indexOf(found)
        Carts.splice(id,1)
        
        var FreshCart = Carts
        localStorage.setItem('items', JSON.stringify(FreshCart));
        setCartLen(FreshCart.length)
        
  }

  
  return (
    <BrowserRouter>
    <productData.Provider value={data}>
    <ToastContainer></ToastContainer>
      <TopNav cartLen={cartLen} />
      <Route exact path="/">
      <Banner />
      <Category  />
      <About />
      <TopSelling />
      <Contact />
      </Route>
      <Route path="/c/:id" > {/* For Category Route*/}
      <Products AddToCart={({title,price,photo,category,_id})=>{
        AddToCart({title,price,photo,category,_id})
      }} />
      </Route>
      <Route path="/p/:id" >
      <Product AddToCart={({title,price,photo,category,_id})=>{
        AddToCart({title,price,photo,category,_id})
      }} />
      </Route>
      <Route path="/login" >
      <Login />
      </Route>
      <Route path="/signup" >
      <Signup />
      </Route>
      <Route path="/checkout" >
      <Checkout />
      </Route>
      <Route path="/cart" >
      <Cart AddToCart={({title,price,photo,category,_id})=>{
        AddToCart({title,price,photo,category,_id})
      }}
      RemoveFromCart={({_id})=>{
        RemoveFromCart({_id})
      }}
       />
      </Route>
      <Route  path="/admin/:name/addproduct" >
      <AddProduct />
      </Route>
      <Route exact path="/admin/:name" >
      <AdminHome />
      </Route>
      <Footer />
    </productData.Provider>
    </BrowserRouter>
  );
}

export default App;

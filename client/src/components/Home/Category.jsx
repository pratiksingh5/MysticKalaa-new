import React, { useContext } from 'react'

import { productData } from '../../App'

function Category() {
    const categoryData = useContext(productData)
    const Data = [...new Map(categoryData.map((i)=> [i.category,i])).values()]
    
    return (
      
        <div id="categories">
      <h1 className="heading">Categories</h1>
      <div className="container">
      {
        Data.map((i,index)=>{
            
          return(
            <div className="card" key={index} >
              <a href={`/c/${i.category}`} >
              <div className="cardImg" style={{backgroundImage:`url(${i.photo})`}} ></div>
              <h6>{i.category} </h6>
              </a>            
            </div>
          )
        })
      }
        
      </div>
    </div>
    )
}

export default Category

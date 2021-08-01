import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { productData } from '../../App'

function Product(props) {
    const params = useParams()
    const productdata = useContext(productData)
    const data = [...productdata.filter((f)=>{return f._id === params.id })]
    
    return (
        <div className="single-product">
        {
            data.map(({title,price,photo,category,_id})=>{
                return(
                    <React.Fragment key={_id}>
                    <div className="single-pr-img">
                        <img src="https://picsum.photos/300/300" alt="" />
                    </div>
                    <div className="single-pr-detail">
                        <div>
                            <h2>{title} </h2>

                        </div>
                        <br />
                        <div>
                            <h3>{price} </h3>
                            <h5>in Stock</h5>
                        </div>
                        <button onClick={()=>props.AddToCart({title,price,photo,category,_id})} >Add to Cart</button>
                    </div>
                    </React.Fragment>
                )
            })
        }
            
        </div>
    )
}

export default Product

import React from 'react'

function TopSelling() {
    return (
        <div id="topProduct">
        <h1 className="heading">Order Customizable Product</h1>
        <div className="elements">
            <div className="elem">
                <div className="elemImg"></div>
                <h6>Posters</h6>
            </div>
            <div className="elem">
                <div className="elemImg"></div>
                <h6>Notebooks</h6>
            </div>
            <div className="elem">
                <div className="elemImg"></div>
                <h6>Wall Kits</h6>
            </div>
            <div className="elem">
                <div className="elemImg"></div>
                <h6>Flyers</h6>
            </div>
        </div>
        <a href="#"><button>Order Now</button></a>
        
    </div>
    )
}

export default TopSelling

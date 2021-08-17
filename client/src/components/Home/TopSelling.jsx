import React from 'react'

function TopSelling() {
    return (
        <div id="topProduct">
        <h1 className="heading">Only Customizable Products </h1>
        <p>All items are customizable</p>
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
        <a href="#"><button>Customize Product</button></a>
        
    </div>
    )
}

export default TopSelling

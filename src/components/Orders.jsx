import React from 'react'
import './Orders.css'
import SearchIcon from '@mui/icons-material/Search';


function Orders() {

    const searchIconStyle = {
        fontSize: '1.2rem',
        fontWeight: 'bolder'
    }


    return (
        <div className="ordersMainWrapper">

            <section className="ordersHeadingSearchBarWrapper">
                <h1 className="ordersHeading">Your Orders</h1>

                <div className="searchBarContainer">
                    <SearchIcon style={searchIconStyle} />
                    <input type="text" className="ordersSearchBarInput" placeholder='Search all orders' />
                </div>

                <button className="ordersSearchBtn">Search Orders</button>

            </section>
            <hr className="ordersHeadingBottomLine" />

            <section className="orderItemsWrapper">

                <div className="ordersDetailsHeader">

                   <div className="orderPlacedDetailsContainer">
                   <p className="orderPlacedDetailsTitle">Order placed</p>
                   <p className="orderPlacedDetails">Details</p>
                   </div>

                   <div className="orderPlacedDetailsContainer">
                   <p className="orderPlaceDetailsTotalTitle">Total</p>
                   <p className="orderPlaceDetailsTotal">Details</p>
                   </div>

                   <div className="orderPlacedDetailsContainer">
                   <p className="orderPlaceDetailsNameTitle">Ship To</p>
                   <p className="orderPlaceDetailsName">Details</p>
                   </div>

                </div>
                
            </section>
        </div>
    )
}

export default Orders
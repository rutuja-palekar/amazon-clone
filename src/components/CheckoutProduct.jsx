import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider'

function CheckoutProduct({ id, title, image, singleImage, price }) {

    const [{ cart }, dispatch] = useStateValue();

    const deleteProductFromCart = () => {
        dispatch({
            type: "deleteFromCart",
            id: id,
        })
    }

    return (
        <div className='checkoutProductWrapper'>
            {image && <img className='checkoutProductImg' src={image} alt="Product" />}
            {singleImage && <img className='checkoutProductSingleImg' src={singleImage} alt="Image is not showing" />}

            <div className="checkoutProductDetails">
                <h1 className="checkoutProductTitle">{title}</h1>

                <div className="checkoutProductPrice">
                    <small className='checkoutRsSymbol'>₹</small>
                    <strong className='checkoutPriceInRupees'>{price}</strong>
                </div>

                <div className='checkoutProductGift'>
                    <small><input type="checkbox" />&nbsp; This will be a gift</small>
                </div>

                <button className='checkoutProductDeleteBtn' onClick={deleteProductFromCart}>Delete</button>

            </div>
        </div>
    )
}

export default CheckoutProduct
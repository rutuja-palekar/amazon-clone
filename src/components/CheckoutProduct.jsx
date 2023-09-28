import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';

function CheckoutProduct({ id, title, image, singleImage, price, rating }) {

    return (
        <div className='checkoutProductWrapper'>
            {image && <img className='checkoutProductImg' src={image} alt="Product" />}
            {singleImage && <img className='checkoutProductImg' src={singleImage} alt="Image is not showing" />}

            <div className="checkoutProductDetails">
                <h1 className="checkoutProductTitle">{title}</h1>

                <span className="checkoutProductPrice">
                    <strong>₹</strong>
                    <strong>{price}</strong>
                </span>

                <div className="checkoutProductRating">
                    {Array(rating).fill().map((_, i) => (
                        <span key={i} className='starRating'>&#9733;</span>
                    ))}
                </div>
                <button className='checkoutProductDeleteBtn'>Delete</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
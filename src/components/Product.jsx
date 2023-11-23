import React from 'react'
import './Product.css'
import { useStateValue } from "./StateProvider.jsx"

function Product({ id, title, image, singleImage, price, rating }) {
  const [{ cart }, dispatch] = useStateValue()

  const addToCart = () => {
    dispatch({
      type: "addToCart",
      item: {
        id: id,
        title: title,
        image: image,
        singleImage: singleImage,
        price: price,
        rating: rating,
      }
    })
  }

  return (
    <div className='product'>
      <div className="productInfo">
        <p>{title}</p>

        <p className='productPrice'>
          <small>&#8377;</small>
          <strong>{price}</strong>
        </p>

        <div className='productRating'>
          {Array(rating).fill().map((_, i) => (
            <span key={i} className='starRating'>&#9733;</span>
          ))}
        </div>

        <div className="imageCartContainer">
          {image && <img className='productImage' src={image} alt="Product" />}
          {singleImage && <img className='singleProductImage' src={singleImage} alt="Product" />}

          <button className='addToCartButton' onClick={addToCart}>Add to Cart</button>
        </div>

      </div>
    </div>
  )
}

export default Product
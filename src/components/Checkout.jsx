import React from 'react'
import './Checkout.css'
import CreditCard from '../imagesicons/CreditCard.jpg'
import Subtotal from './Subtotal'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'

function Checkout() {

  const [{ cart }, dispatch] = useStateValue();

  return (
    <div className='checkoutContainer'>

      <div className="adSection">

        <img src={CreditCard} alt="Credit Card" className="checkoutAdImage" />

        <h1 className='checkoutAdHeading'>Get your credit card approved in 30 minutes. Enjoy <strong> 3% back (<span className='offerCashback'>Rs.552.24</span>) </strong> on your order + 3 months prime. <strong>Apply Now.</strong></h1>
      </div>

      <div className="checkoutContainerDivider">
        <div className="checkoutLeftContainer">
          <h1 className='checkoutTitle'>Shopping Cart</h1>

          {cart.map(item => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              singleImage={item.singleImage}
              price={item.price}
              rating={item.rating}
            />
          ))}

        </div>

        <div className="checkoutRightContainer">
          <Subtotal />
        </div>
      </div>
    </div>
  )
}

export default Checkout
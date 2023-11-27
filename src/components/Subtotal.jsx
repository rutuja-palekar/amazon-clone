import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider.jsx'
import { getCartTotal } from './Reducer';
import { useNavigate } from 'react-router-dom';


function Subtotal() {
  const [{ cart }, dispatch] = useStateValue();
  const navigate = useNavigate()

  const cartTotal = getCartTotal(cart).toFixed(2);

  const disableProceedToBuyBtn = () => {
    if (cart?.length <= 0) {
      alert('Please select at least one item to Checkout')
    }
  }

  return (
    <div className="subTotalContainer">
    <div className='subTotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p className='subTotalText'>
              Subtotal ({cart.length} items):
              <strong className='rupeeSymbol'>₹</strong>
              <strong className="totalPrice">{value}</strong>
            </p>

            <small className='subtotalGift'>
              <input type="checkbox" />&nbsp; This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={cartTotal}
        displayType={"text"}
        thousandSeparator={true}
      />

      <div className="proceedToBuyBtnContainer">
        {cart?.length > 0 && (<button className='proceedToBuyBtn' onClick={e => navigate('/payment')}>Proceed to Buy</button>)}

        {cart?.length <= 0 && (<button className='proceedToBuyBtn' onClick={disableProceedToBuyBtn}>Proceed to Buy</button>)}
      </div>

    </div>
    </div>
  )
}

export default Subtotal
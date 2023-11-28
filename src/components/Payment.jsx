import React, { useEffect, useState } from 'react'
import './Payment.css'
import AmazonCheckoutPaymentLogo from '../imagesicons/AmazonCheckoutPaymentLogo.png'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LockIcon from '@mui/icons-material/Lock';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { getFirestore, collection, query, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getCartTotal } from './Reducer';
import { useStateValue } from './StateProvider';


function Payment() {
  const stripe = useStripe()
  const elements = useElements()
  const [paymentAddresses, setPaymentAddresses] = useState([]);
  const [paymentUser, setPaymentUser] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [sectionIcons, setSectionIcons] = useState({
    deliveryAddress: 'down',
    payment: 'down',
    items: 'down',
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditDebitCard')

  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [{ cart }, dispatch] = useStateValue()
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState('')
  const [paymentName, setPaymentName] = useState('');
  const [cardDetailsEntered, setCardDetailsEntered] = useState(false);
  const [nicknameEntered, setNicknameEntered] = useState(false);
  const [addressFilled, setAddressFilled] = useState(false);
  const [paymentMethodFilled, setPaymentMethodFilled] = useState(false);
  const navigate = useNavigate()
  const cartTotal = getCartTotal(cart).toFixed(2);

  useEffect(() => {
    const pageRefreshHandler = (event) => {
      // Prompt the user if user tries to reload
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', pageRefreshHandler);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', pageRefreshHandler);
    };
  }, []);

  useEffect(() => {
    const paymentLoadingDelay = 4000;

    setTimeout(() => {
      const db = getFirestore();
      const currentUser = auth.currentUser;

      if (currentUser) {
        setPaymentUser(currentUser);

        // Set the user's name as the Stripe customer's name
        const paymentName = currentUser.displayName; // User's name fetched from firebase

        setPaymentName(paymentName);

        const userUID = currentUser.uid;
        const addressesRef = collection(db, 'users', userUID, 'addresses');
        const addressesQuery = query(addressesRef);

        getDocs(addressesQuery)
          .then((querySnapshot) => {
            const addressesData = [];
            querySnapshot.forEach((doc) => {
              addressesData.push({ id: doc.id, ...doc.data() });
            });
            setPaymentAddresses(addressesData);
          })
          .catch((error) => {
            console.error('Error fetching addresses:', error);
          })
          .finally(() => {
            setPaymentLoading(false);
          });
      } else {
        setPaymentLoading(false);
      }
    }, paymentLoadingDelay);
  }, []);


  if (paymentLoading || !stripe || !elements) {
    return (
      <div className="paymentLoaderWrapper">
        <span className='paymentLoader'></span>
      </div>
    )
  }

  const joinPText = (address) => {
    const pTags = [];
    for (const key in address) {
      if (address[key].addCityName !== undefined) {
        pTags.push(address[key].addApartmentName);
        pTags.push(address[key].addStreetName);
        pTags.push(address[key].addLandmarkName);
        pTags.push(address[key].addCityName);
        pTags.push(address[key].addStateName);
        pTags.push(address[key].addPinCode);
        pTags.push(address[key].addCountryName);
      }
    }
    return pTags.join(', ');
  }


  const handleAddressSelection = (e, addressId) => {
    setSelectedAddress(addressId);
    setAddressFilled(true);
  }

  const toggleSection = (section) => {
    setSectionIcons((prevIcons) => ({
      ...prevIcons,
      [section]: prevIcons[section] === 'up' ? 'down' : 'up',
    }))
  }


  const addressContainers = paymentAddresses.map((address) => (
    <div className="paymentViewAddressContainerWrapper" key={address.id}>
      <section className="paymentViewAddressContainer">

        {Object.keys(address).map((key) => {

          if (address[key].addCityName !== undefined) {
            const isSelected = address.id === selectedAddress;
            const labelStyles = isSelected
              ? {
                backgroundColor: '#FCF5EE',
                border: '1px solid #FBD8B4',
                borderRadius: '0.3rem',
              }
              : {
                backgroundColor: '#fff',
                border: '1px solid transparent',
                borderRadius: '0.3rem',
              };

            return (
              <div className='paymentUserAddressContainer' key={key}>

                <label className='selectAddressLabel' style={labelStyles}>
                  <input
                    type="radio" className='selectAddressRadioInput'
                    name="selectedAddress"
                    value={address.id}
                    onChange={(e) => handleAddressSelection(e, address.id)} checked={isSelected}
                  />

                  <div className='paymentAddress'>
                    <h5 className='paymentViewAddFullNameHeading'>{`${address[key].addFullName}`}
                    </h5>
                    {joinPText(address)}
                  </div>

                </label>
              </div>
            )
          }
          return null;
        })}
      </section>
    </div>
  ));

  const LockIconStyle = {
    marginRight: "10rem",
    color: "#808080",
    fontSize: "2rem"
  }

  const paymentAddTwoToneIconStyle = {
    fontSize: "1.7rem",
    color: '#c7c7c7',
    cursor: 'pointer'
  }

  const keyboardArrowUpDownIconStyle = {
    marginLeft: '34rem',
    verticalAlign: 'middle',
  }

  const reviewItemsArrowUpDownIconStyle = {
    marginLeft: '33.5rem',
    verticalAlign: 'middle',
  }

  const fetchClientSecret = async () => {
    try {
      const response = await fetch('http://localhost:3001/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total: cartTotal * 100, // Convert cartTotal to paisa
          currency: 'inr',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.clientSecret;
      } else {
        throw new Error('Failed to create Payment Intent');
      }
    } catch (error) {
      console.error('Error fetching clientSecret:', error);
      return null;
    }
  };

  const addOrderToFirestore = async () => {
    try {
      const db = getFirestore();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userUID = currentUser.uid;
        const ordersRef = collection(db, 'users', userUID, 'orders');

        // Get selected address
        const selectedAddressData = paymentAddresses.find(address => address.id === selectedAddress);

        // Get item details from the cart
        const orderItems = cart.map(item => ({
          title: item.title,
          price: item.price,
          image: item.image || item.singleImage,
        }));

        // Determine the order name (e.g., order1, order2, ...)
        const orderNumber = await getOrderNumber(ordersRef);

        // Create an order document
        const orderData = {
          timestamp: serverTimestamp(),
          address: selectedAddressData,
          items: orderItems,
        };

        // Add the order to Firestore
        const docRef = await addDoc(ordersRef, { ...orderData, OrderNo: `${orderNumber}` });
        console.log('Order added to Firestore:', docRef.id);
      }
    } catch (error) {
      console.error('Error adding order to Firestore:', error);
    }
  };

  // Helper function to get the next order number
  const getOrderNumber = async (ordersRef) => {
    const querySnapshot = await getDocs(ordersRef);
    return querySnapshot.size + 1;
  };


  const cardDetailsSubmitHandler = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      if (!nicknameEntered && !paymentName.trim()) {
        setError('Please enter a nickname before proceeding with payment.');
        setSucceeded(false);
        setProcessing(false);
        return;
      }

      const clientSecret = await fetchClientSecret();

      if (clientSecret) {
        const cardNumberElement = elements.getElement(CardNumberElement);
        // console.log(cardNumberElement)

        // Default card holder name is user's full name fetched from firebase
        // If user changed default card name, new card holder name will be stored on stripe with Guest Tag
        const paymentCardHolderName = setPaymentName(e.target.value) || paymentName;

        // Create a payment method
        const { paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardNumberElement,
          billing_details: {
            name: paymentCardHolderName, // Default or entered card holder's name will be stored on stripe as customer's name
          },
        });

        if (paymentMethod.error) {
          // Handle the error while creating the payment method
          setError(paymentMethod.error.message);
          setSucceeded(false);
        }
        else {
          // Use the resulting payment method object in confirmCardPayment
          const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id
          });
          // console.log(paymentMethod);

          if (error) {
            // Payment failed, handle the error
            setError(error.message);
            setSucceeded(false);
          }
          else {
            // Payment successful, handle redirection
            setError(null);
            setSucceeded(true);
            // console.log("Payment Successful!")
          }
          // Add order details to Firestore
          await addOrderToFirestore();
          navigate('/')
        }
      } else {
        console.error("Failed to obtain clientSecret. Cannot proceed with payment.");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    }

    setProcessing(false);

  };

  const cardHandler = (e) => {
    // Listen for changes in the CardElement
    // Also display any errors as the customer types their card details
    setDisabled(e.empty)
    setCardDetailsEntered(!e.empty);
    setError(e.error ? e.error.message : "")
    setPaymentMethodFilled(!e.error ? true : false)
  }


  return (
    <div className="checkoutPaymentWrapper">

      <header className="checkoutPaymentHeader">

        <img className='checkoutPaymentImg' src={AmazonCheckoutPaymentLogo} alt="Logo" />

        <h1 className="checkoutPaymentHeading">Checkout</h1>

        <LockIcon style={LockIconStyle} />

      </header>


      <section className="selectDeliveryAddressWrapper">

        <span className='selectDeliverAddressHeadingNo'>1</span>

        <h1 className="selectDeliverAddressHeading">Select a delivery address
          {sectionIcons.deliveryAddress === 'down' ? (
            <KeyboardArrowDownIcon onClick={() => toggleSection('deliveryAddress')} style={keyboardArrowUpDownIconStyle} />
          ) : (
            <KeyboardArrowUpIcon onClick={() => toggleSection('deliveryAddress')} style={keyboardArrowUpDownIconStyle} />
          )}
        </h1>

        {sectionIcons.deliveryAddress === 'down' && (
          <div className="showAddressesWrapper">
            <div className="showAddressContainer">
              <h1 className='showAddressHeading'>Your addresses</h1>
              <hr className='showAddressBottomLine' />
              {addressContainers}

              <Link className="paymentAddNewAddressNavLinkWrapper" to='/addnewaddress'>
                <AddTwoToneIcon style={paymentAddTwoToneIconStyle} />
                <h6 className="paymentAddNewAddressNavLink">Add a new address</h6>
              </Link>
            </div>
          </div>
        )}

        <hr className="selectDeliveryAddressFinishLine" />

      </section>


      <section className="selectPaymentMethodWrapper">

        <span className='selectPaymentMethodHeadingNo'>2</span>

        <h1 className="selectPaymentMethodHeading">Select a payment method
          {sectionIcons.payment === 'down' ? (
            <KeyboardArrowDownIcon onClick={() => toggleSection('payment')} style={keyboardArrowUpDownIconStyle} />
          ) : (
            <KeyboardArrowUpIcon onClick={() => toggleSection('payment')} style={keyboardArrowUpDownIconStyle} />
          )}
        </h1>

        {sectionIcons.payment === 'down' && (
          <div className="cardDetailsWrapper">

            <section className="cardPaymentMethod">

              <h5 className="paymentMethodHeading">
                <input type="radio" className='radioCheckpaymentMethod' value={selectedPaymentMethod} onChange={() => setSelectedPaymentMethod('creditDebitCard')} checked={selectedPaymentMethod === 'creditDebitCard'} />
                Credit or debit card
              </h5>

              <h4 className="cardDetailsHeading">Enter card details</h4>

              <div className="enterCardDetailsWrapper">

                <form className='paymentCardDetailsForm'>
                  <label className='paymentCardNoLabel'> Card number
                    <CardNumberElement onChange={cardHandler} />
                  </label>

                  <label htmlFor='paymentCardHolderName' className="paymentCardHolderNameLabel">Nickname
                    <br />
                    <input type="text" className="paymentCardHolderNameInput" id='paymentCardHolderName' defaultValue={paymentName} onChange={(e) => {
                      setPaymentName(e.target.value)
                      setNicknameEntered(!!e.target.value.trim())
                    }} />
                  </label><br />

                  <label className='paymentCardExpireDtLabel'>Expiry date
                    <CardExpiryElement onChange={cardHandler} />
                  </label>

                  <label className='paymentCardCvcLabel'>CVC
                    <CardCvcElement onChange={cardHandler} />
                  </label>

                  {error && <div className='paymentCardDetailsError'>{error}</div>}

                </form>
              </div>
            </section>
          </div>
        )}

        <hr className="selectPaymentMethodFinishLine" />

      </section>


      <section className="paymentReviewItemsWrapper">

        <span className='paymentReviewItemsHeadingNo'>3</span>

        <h1 className="paymentReviewItemsHeading">Review items and delivery
          {sectionIcons.items === 'down' ? (
            <KeyboardArrowDownIcon onClick={() => toggleSection('items')} style={reviewItemsArrowUpDownIconStyle} />
          ) : (
            <KeyboardArrowUpIcon onClick={() => toggleSection('items')} style={reviewItemsArrowUpDownIconStyle} />
          )}
        </h1>

        {sectionIcons.items === 'down' && (
          <>
            <div className="reviewItemsWrapper">
              <h5 className='reviewItemsHeading'>Items dispatched by Amazon</h5>
              {cart.map(item => (
                <div key={item.id} className="reviewItems">
                  {item.image &&
                    <img className='reviewItemImg' src={item.image} alt="Product" />}
                  {item.singleImage &&
                    <img className='reviewItemImg' src={item.singleImage} alt="Product" />}
                  <div className="reviewItemTitlePriceWrapper">
                    <h5 className='reviewItemTitle'>{item.title}</h5>
                    <h5 className='reviewItemPrice'>₹{item.price}</h5>
                  </div>
                </div>
              ))}

            </div>

            {addressFilled && paymentMethodFilled ?
              (<div className="placeOrderTotalWrapper">
                <button className='placeOrderBtn' onClick={cardDetailsSubmitHandler}>
                  <span>{processing ? <p>Processing</p> : "Place your order"}</span>
                </button>
                <section className="paymentPriceWrapper">
                  <CurrencyFormat
                    renderText={(value) => (
                      <h3 className='paymentOrderTotal'>Order Total: {value}</h3>
                    )}
                    decimalScale={2}
                    value={cartTotal}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  <p className='placeOrderTermsConditions'>By placing your order, you agree to Amazon's
                    <span className="placeOrderTermsConditionsInnerTxt"> privacy notice </span>
                    and
                    <span className="placeOrderTermsConditionsInnerTxt"> conditions of use</span>.</p>
                </section>
              </div>) : null}
          </>
        )}

        <hr className="reviewItemsPlaceOrderFinishLine" />

      </section>

    </div>
  )
}

export default Payment
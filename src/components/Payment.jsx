import React, { useEffect, useState } from 'react'
import './Payment.css'
import AmazonCheckoutPaymentLogo from '../imagesicons/AmazonCheckoutPaymentLogo.png'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LockIcon from '@mui/icons-material/Lock';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { getFirestore, collection, query, getDocs, doc } from 'firebase/firestore';
import { auth } from './firebase';
import { Link, Navigate } from 'react-router-dom';

function Payment() {
  const [paymentAddresses, setPaymentAddresses] = useState([]);
  const [paymentUser, setPaymentUser] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [sectionIcons, setSectionIcons] = useState({
    deliveryAddress: 'down',
    address: 'down',
    payment: 'down',
    items: 'down',
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditDebitCard')
  const [cardNo, setCardNo] = useState('')


  useEffect(() => {
    const paymentLoadingDelay = 4000;

    setTimeout(() => {
      const db = getFirestore();
      const currentUser = auth.currentUser;

      if (currentUser) {
        setPaymentUser(currentUser);

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

  if (paymentLoading) {
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
  }

  const toggleSection = (section) => {
    setSectionIcons((prevIcons) => ({
      ...prevIcons,
      [section]: prevIcons[section] === 'up' ? 'down' : 'up',
    }))
  }

  const addressContainers = paymentAddresses.map((address, index) => (
    <div className="paymentViewAddressContainerWrapper">
      <section className="paymentViewAddressContainer" key={address.id}>

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

                  <p className='paymentAddress'>
                    <h5 className='paymentViewAddFullNameHeading'>{`${address[key].addFullName}`}
                    </h5>
                    {joinPText(address)}
                  </p>

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

  const validateCardNoHandler = (e) => {
    setCardNo(e.target.value)

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

            <div className="selectAddressWrapper">
              <button className='selectAddressBtn'>Use this address</button>
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


        <div className="cardDetailsWrapper">

          <section className="cardPaymentMethod">

            <h5 className="paymentMethodHeading">
              <input type="radio" className='radioCheckpaymentMethod' value={selectedPaymentMethod} onChange={() => setSelectedPaymentMethod('creditDebitCard')} checked={selectedPaymentMethod === 'creditDebitCard'} />
              Credit or debit card
            </h5>

            <h4 className="cardDetailsHeading">Enter card details</h4>

            <div className="enterCardDetailsWrapper">

              <fieldset className="enterCardDetailsErrorMsg">
                <label htmlFor="cardNo" className="cardNoLabel">Card number</label>
                <input type="text" className='cardNoInput' id='cardNo' onChange={validateCardNoHandler} value={cardNo} />
                <span className="cardPaymentMethodErrorMsg"></span>
              </fieldset>

              <fieldset className="enterCardDetailsErrorMsg">
                <label htmlFor="cardHolderName" className="cardHolderNameLabel">Nickname</label>
                <input type="text" className='cardHolderInput' id='cardHolderName' />
                <span className="cardPaymentMethodErrorMsg"></span>
              </fieldset>

              <fieldset className="enterCardDetailsErrorMsg">
                <label htmlFor="cardHolderCVV" className="cardHolderCVVLabel">CVV</label>
                <input type="text" className='cardCVVInput' id='cardHolderCVV' />
                <span className="cardPaymentMethodErrorMsg"></span>
              </fieldset>

              <fieldset className="enterCardDetailsErrorMsg">
                <label htmlFor="cardExpireDate" className="cardExpireDateLabel">Expiry Date</label><br />

                <select name="cardExpireMonth" className='selectCardExpireMonth' id="cardExpireDate" >
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                  <option value="7">07</option>
                  <option value="8">08</option>
                  <option value="9">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>

                <select name="cardExpireYear" className='selectCardExpireYear' id="cardExpireDate">
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
                <span className="cardPaymentMethodErrorMsg"></span>
              </fieldset>

            </div>
          </section>

          <div className="selectPaymentMethodBtnWrapper">
            <button className='selectPaymentMethodBtn'>Use this payment method</button>
          </div>
        </div>


        <hr className="selectPaymentMethodFinishLine" />
      </section>
    </div>
  )
}

export default Payment

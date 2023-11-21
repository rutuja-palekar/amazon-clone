import React, { useEffect, useState } from 'react'
import './AddNewAddress.css'
import CountryCodes from './CountryCodes'
import indianStates from './indianStates';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './firebase'
import { auth, database } from './firebase';
import { addDoc, collection, doc, getFirestore, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function AddNewAddress() {
  const [chooseCountry, setChosenCountry] = useState({ name: 'India' });
  const [selectState, setSelectState] = useState()
  const [addSelectStateNameError, addSetSelectStateNameError] = useState('');

  const [addFullName, setAddFullName] = useState('');
  const [addFullNameError, setAddFullNameError] = useState('');

  const [addMobileNo, setAddMobileNo] = useState('');
  const [addMobileNoError, setAddMobileNoError] = useState('');

  const [addPinCode, setAddPinCode] = useState('');
  const [addPinCodeError, setAddPinCodeError] = useState('');

  const [addApartmentName, setAddApartmentName] = useState('');
  const [addApartmentNameError, setAddApartmentNameError] = useState('')

  const [addStreetName, setAddStreetName] = useState('');
  const [addStreetNameError, setAddStreetNameError] = useState('');

  const [addLandmarkName, setAddLandmarkName] = useState('');
  const [addLandmarkNameError, setAddLandmarkNameError] = useState('');

  const [addCityName, setAddCityName] = useState('');
  const [addCityNameError, setAddCityNameError] = useState('');


  const navigate = useNavigate()


  const countryChangeHandler = (e) => {
    const chosenValue = e.target.value;
    const chosenCountryInfo = CountryCodes.find((country) => country.value === chosenValue)

    if (chosenCountryInfo) {
      setChosenCountry(chosenCountryInfo)
      setSelectState('')
    }
    else {
      setChosenCountry({ name: 'India' });
    }
  }

  const addFullNameHandler = () => {
    const addNamePattern = /^[a-zA-Z]+( [a-zA-Z]+)*$/;

    if (addFullName === "") {
      setAddFullNameError("Please enter a name.")
      return false;
    }

    else if (!addNamePattern.test(addFullName)) {
      setAddFullNameError("Name cannot include invalid characters.")
      return false;
    }

    else if (addFullName.length < 10) {
      setAddFullNameError("Name should not be too short.")
      return false;
    }

    else if (addFullName.length > 50) {
      setAddFullNameError("Name should not be too long.")
      return false;
    }

    else {
      setAddFullNameError("")
      return true;
    }
  }

  
  const addMobileNoHandler = () => {
    const addMobileNoPattern = /^\d{1,15}$/;

    if (addMobileNo === "") {
      setAddMobileNoError("Please enter a phone number so we can call if there are any issues with delivery.")
      return false;
    }

    else if (!addMobileNoPattern.test(addMobileNo)) {
      setAddMobileNoError("Invalid mobile number.")
      return false;
    }

    else {
      setAddMobileNoError("")
      return true;
    }
  }

  const addPinCodeHandler = () => {
    const addPinCodePattern = /^\d{6}$/;

    if (addPinCode === "") {
      setAddPinCodeError("Please enter a ZIP or postal code.")
      return false;
    }

    else if (!addPinCodePattern.test(addPinCode)) {
      setAddPinCodeError("Invalid pin code.")
      return false;
    }

    else {
      setAddPinCodeError("")
      return true;
    }
  }

  const addApartmentNameHandler = () => {

    if (addApartmentName === "") {
      setAddApartmentNameError("Please enter the name of flat, house no., building, company or apartment.")
      return false;
    }

    else {
      setAddApartmentNameError("")
      return true;
    }
  }

  const addStreetNameHandler = () => {

    if (addStreetName === "") {
      setAddStreetNameError("Please enter an area, street, sector or village name.")
      return false;
    }

    else {
      setAddStreetNameError("")
      return true;
    }
  }

  const addLandmarkNameHandler = () => {

    if (addLandmarkName === "") {
      setAddLandmarkNameError("Please enter the landmark.")
      return false;
    }

    else {
      setAddLandmarkNameError("")
      return true;
    }
  }

  const addCityNameHandler = () => {

    if (addCityName === "") {
      setAddCityNameError("Please enter the city.")
      return false;
    }

    else {
      setAddCityNameError("")
      return true;
    }
  }

  const stateChangeHandler = (e) => {
    const selectedState = e.target.value;
    setSelectState(selectedState);
  }

  const selectStateHandler = (e) => {
    const selectState = e.target.value;

    if (selectState === "") {
      addSetSelectStateNameError("Please enter a state, region or province.")
      return false;
    }

    else {
      addSetSelectStateNameError("")
      return true;
    }
  }

  const validateAddressFields = {
    addCountryName: countryChangeHandler,
    addFullName: addFullNameHandler,
    addMobileNo: addMobileNoHandler,
    addPinCode: addPinCodeHandler,
    addApartmentName: addApartmentNameHandler,
    addStreetName: addStreetNameHandler,
    addLandmarkName: addLandmarkNameHandler,
    addCityName: addCityNameHandler,
    addStateName: stateChangeHandler
  }

  const addAddressHandler = (e) => {
    e.preventDefault()

    const isAddFieldsValid = Object.values(validateAddressFields).every(Boolean)

    // console.log(isAddFieldsValid)

    if (isAddFieldsValid) {
      saveAddressHandler(
        chooseCountry.name,
        addFullName,
        addMobileNo,
        addPinCode,
        addApartmentName,
        addStreetName,
        addLandmarkName,
        addCityName,
        selectState
      ).then(() => {
        navigate('/viewaddress')
      })
    } else {
      return;
    }
  }

  const saveAddressHandler = async (
    addCountryName,
    addFullName,
    addMobileNo,
    addPinCode,
    addApartmentName,
    addStreetName,
    addLandmarkName,
    addCityName,
    addStateName
  ) => {
    try {
      const db = getFirestore();
      const user = auth.currentUser;
      const userUID = user.uid;

      // Create a reference to the user's document
      const userDocRef = doc(db, "users", userUID);

      // Get the user's data and addresses sub-collection
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();
      let addressNumber = 1; // Initialize the address number to 1 by default

      if (userData && userData.lastAddressNumber) {
        // Use the last stored address number and increment it for the new address
        addressNumber = userData.lastAddressNumber + 1;
      }

      // Create a new address document within the "addresses" sub-collection
      const addressCollectionRef = collection(userDocRef, "addresses");
      const newAddress = {
        addCountryName,
        addFullName,
        addMobileNo,
        addPinCode,
        addApartmentName,
        addStreetName,
        addLandmarkName,
        addCityName,
        addStateName
      };

      // Add the new address document to the sub-collection with the incremented address number
      await addDoc(addressCollectionRef, { [`address${addressNumber}`]: newAddress });

      // Update the lastAddressNumber in the user's document
      await updateDoc(userDocRef, { lastAddressNumber: addressNumber });

      console.log('Address saved successfully');
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  return (
    <div className="addNewAddressWrapper">

      <form action="post" className="addNewAddressForm">
        <h1 className='addNewAddressHeading'>Add a new address</h1>


        <fieldset className="addNewAddressErrorMesssage">
          <label htmlFor="countryOrRegion" className="addNewAddressLabel">Country/Region</label>

          <div className="countryOrRegionSelectContainer">
            <select
              className='countryNamesDropdownMenu'
              onChange={countryChangeHandler}
              value={chooseCountry ? chooseCountry.value : ''}
            >

              {CountryCodes.map((country) => (
                <option
                  key={country.value}
                  value={country.value}
                  data-alpha3code={country.alpha3code}
                >
                  {`${country.name}`}
                </option>
              ))}
            </select>
          </div>
          <span className='addNewAddressErrorMsg'></span>
        </fieldset>

        <fieldset className="addNewAddressErrorMesssage">
          <label htmlFor="fullNameLabel" className="addNewAddressLabel">Full name (First and Last name)</label>
          <input type="text" className="fullNameInput" id='fullNameLabel' onChange={e => setAddFullName(e.target.value)} onBlur={addFullNameHandler} value={addFullName} />
          <h6 className='addNewAddressErrorMsg'>{addFullNameError}</h6>
        </fieldset>

        <fieldset className="addNewAddressErrorMesssage">
          <label htmlFor="mobileNumberLabel" className="addNewAddressLabel">Mobile number</label>
          <input type="text" className="mobileNumberInput" id='mobileNumberLabel' onChange={e => setAddMobileNo(e.target.value)} onBlur={addMobileNoHandler} value={addMobileNo} />
          <span className='addNewAddressErrorMsg'>{addMobileNoError}</span>
        </fieldset>

        <fieldset className="addNewAddressErrorMesssage">
          <label htmlFor="pinCodeLabel" className="addNewAddressLabel">Pincode</label>
          <input type="text" className="pinCodeInput" id='pinCodeLabel' placeholder='6 digits [0-9] PIN code' onChange={e => setAddPinCode(e.target.value)} onBlur={addPinCodeHandler} value={addPinCode} />
          <span className='addNewAddressErrorMsg'>{addPinCodeError}</span>
        </fieldset>

        <fieldset className="addNewAddressErrorMesssage">
          <label htmlFor="ApartmentName" className="addNewAddressLabel">Flat, House no., Building, Company, Apartment</label>
          <input type="text" className="ApartmentNameInput" id='ApartmentName' onChange={e => setAddApartmentName(e.target.value)} onBlur={addApartmentNameHandler} value={addApartmentName} />
          <span className='addNewAddressErrorMsg'>{addApartmentNameError}</span>
        </fieldset>

        <fieldset className="addNewAddressErrorMessage">
          <label htmlFor="streetName" className="addNewAddressLabel">Area, Street, Sector, Village</label>
          <input type="text" className="streeNameInput" id='streetName' onChange={e => setAddStreetName(e.target.value)} onBlur={addStreetNameHandler} value={addStreetName} />
          <span className='addNewAddressErrorMsg'>{addStreetNameError}</span>
        </fieldset>

        <fieldset className="addNewAddressErrorMessage">
          <label htmlFor="landmarkName" className="addNewAddressLabel">Landmark</label>
          <input type="text" className="landmarkInput" id='landmarkName' placeholder='E.g. near apollo hospital' onChange={e => setAddLandmarkName(e.target.value)} onBlur={addLandmarkNameHandler} value={addLandmarkName} />
          <span className='addNewAddressErrorMsg'>{addLandmarkNameError}</span>
        </fieldset>

        <fieldset className="addNewAddressErrorMessage">
          <label htmlFor="townOrCity" className="addNewAddressLabel">Town/City</label>
          <input type="text" className="townOrCityInput" id='townOrCity' onChange={e => setAddCityName(e.target.value)} onBlur={addCityNameHandler} value={addCityName} />
          <span className='addNewAddressErrorMsg'>{addCityNameError}</span>
        </fieldset>

        {chooseCountry.name === 'India' && (
          <fieldset className="addNewAddressErrorMessage">
            <label htmlFor="state" className="addNewAddressLabel">State</label>
            <div className="stateSelectContainer">
              <select
                className='indianStatesDropdownMenu'
                onChange={stateChangeHandler} onBlur={selectStateHandler}
                value={selectState ? selectState : ''}
              >
                <option disabled hidden value="">Choose a state</option>

                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <span className='addNewAddressErrorMsg'>{addSelectStateNameError}</span>
          </fieldset>
        )}


        <div className="addAddressBtnWrapper">
          <button className="addAddressBtn" type='submit' onClick={(e) => addAddressHandler(e)}>Add address</button>
        </div>

      </form>
    </div>
  )
}

export default AddNewAddress
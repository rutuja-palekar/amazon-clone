import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, getDocs, doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
import './ViewAddress.css'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Link } from 'react-router-dom';
import { auth } from './firebase';

export default function ViewAddress() {
    const [addresses, setAddresses] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadingDelay = 4000;

        setTimeout(() => {
            const db = getFirestore();
            const currentUser = auth.currentUser;

            if (currentUser) {
                setUser(currentUser);

                const userUID = currentUser.uid;
                const addressesRef = collection(db, 'users', userUID, 'addresses');
                const addressesQuery = query(addressesRef);

                getDocs(addressesQuery)
                    .then((querySnapshot) => {
                        const addressesData = [];
                        querySnapshot.forEach((doc) => {
                            addressesData.push({ id: doc.id, ...doc.data() });
                        });
                        setAddresses(addressesData);
                    })
                    .catch((error) => {
                        console.error('Error fetching addresses:', error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setLoading(false);
            }
        }, loadingDelay);
    }, []);


    const handleRemoveAddress = async (addressId) => {

        if (!user) {
            return;
        }

        const db = getFirestore();
        const userUID = user.uid;
        const addressesRef = collection(db, 'users', userUID, 'addresses');
        const addressDocRef = doc(addressesRef, addressId);

        try {
            // Retrieve the user data to get the current address count
            const userDocRef = doc(db, 'users', userUID)

            const userDocSnapshot = await getDoc(userDocRef)

            const userData = userDocSnapshot.data()

            // Update the user document to decrease the address count when user deletes one of the address
            updateDoc(userDocRef, { lastAddressNumber: (userData.lastAddressNumber || 1) - 1 })

            // Delete the address document
            await deleteDoc(addressDocRef)

            // Update the state to show the removal of the address
            setAddresses((prevAddresses) => prevAddresses.filter(address => address.id !== addressId))
        }
        catch (error) {
            console.error('Error deleting address:', error)
        }
    }


    // Display a loader till user addresses being fetched
    if (loading) {
        return (
            <div className="loaderWrapper">
                <span className='loader'></span>
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

    const addressContainers = addresses.map((address, index) => (
        <div className="viewAddressContainerWrapper" key={address.id}>
            <section className="viewAddressContainer">
                {/* <h1 className='viewAddressNo'>{`Address ${index + 1}:`}</h1> */}

                {Object.keys(address).map((key) => {
                    // Check if the property has a value and is not undefined
                    if (address[key].addCityName !== undefined) {
                        return (

                            <div className='userAddressContainer' key={key}>
                                <h5 className='viewAddFullNameHeading'>{`${address[key].addFullName}`}</h5>
                                <div className="userAddress">

                                    <p className='address'>{joinPText(address)}</p>
                                    <p className='addressPhoneNo'>{`Phone number: ${address[key].addMobileNo}`}</p>

                                    <button className="deleteAddressBtn" onClick={() => handleRemoveAddress(address.id)}>Remove</button>
                                </div>
                            </div>
                        )
                    }
                    return null;
                })}
            </section>
        </div>
    ));

    const addTwoToneIconStyle = {
        fontSize: '3.2rem',
        color: '#c7c7c7'
    }

    return (
        <div className="viewAddressWrapper">
            <div className="headingAddressWrapper">
                <h1 className="viewAddressHeading">Your Addresses</h1>

                <div className="addNewAdViewAdWrapper">
                    <Link to="/addnewaddress" className="addNewAddressNavLink">
                        <section className="addAddressContainer">
                            <AddTwoToneIcon style={addTwoToneIconStyle} />
                            <h1 className="addAddressHeading">Add address</h1>
                        </section>
                    </Link>

                    <div className="addressContainerWrapper">
                        <section className="addressContainer">
                            {addressContainers}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
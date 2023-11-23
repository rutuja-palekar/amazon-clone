import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import { useEffect, useState } from 'react';
import { auth } from './components/firebase';
import { useStateValue } from './components/StateProvider';
import Payment from './components/Payment';
import SignUp from './components/SignUp';
import AddNewAddress from './components/AddNewAddress';
import ViewAddress from './components/ViewAddress';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders';

export const stripePromise = loadStripe('pk_test_51O7vqrSDugAU6TkHKBRu5H1Afp2MC8X4b96McYUqJ4aMySTowDDwqflolMOdjuOysWZA0RzMrOP0YQrPBBTzTMwE00SMcqav3a')

function App() {
  const [{ }, dispatch] = useStateValue();

  // Used the 'useEffect' hook to listen for changes in the authentication state.
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      // console.log("The user is", authUser)

      // If a user is authenticated, dispatch an action to set the user.
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      }

      // If user is not authenticated, dispatch an action to set the user as null.
      else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])


  return (

    <BrowserRouter>
      <div className="app">

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path="/checkout" element={<><Header /><Checkout /></>} />
          <Route path='/viewaddress' element={<><Header /><ViewAddress /></>} />
          <Route path="/addnewaddress" element={<><Header /><AddNewAddress /></>} />
          <Route path="/payment" element={<><Elements stripe={stripePromise}><Payment /></Elements></>}></Route>
          <Route path='/orders' element={<><Header/><Orders /></>}></Route>
          <Route path="/" element={<><Header /><Home /></>} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import { useEffect } from 'react';
import { auth } from './components/firebase';
import { useStateValue } from './components/StateProvider';

function App() {
  const [{ }, dispatch] = useStateValue();

  // Used the 'useEffect' hook to listen for changes in the authentication state.
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("The user is", authUser)

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
          <Route path="/checkout" element={<><Header /><Checkout /></>} />
          <Route path="/" element={<><Header /><Home /></>} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;


// 4:11:52
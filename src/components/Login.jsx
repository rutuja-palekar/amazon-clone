import React, { useState } from 'react'
import './Login.css'
import AmazonSignInLogo from '../imagesicons/AmazonSignInLogo.png'
import inImg from '../imagesicons/inImg.png'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase.js'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signInHandler = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate('/')
      })
      .catch(error => alert(error.message))
  }

  const signUpClickHandler = () => {
    navigate('/SignUp')
  }

  return (
    <div className='loginComponentWrapper'>
      <div className='loginLogoContainer'>
        <Link to='/'>
          <img className='AmazonSignInLogo' src={AmazonSignInLogo} alt="Logo" />
          <img className='inImg' src={inImg} alt="Logo" />
        </Link>
      </div>

      <div className="loginContainer">
        <form className="loginForm">
          <h1 className='loginFormHeading'>Sign in</h1>

          <label className='loginEmailLabel' htmlFor="email" >Email</label>
          <input className='loginEmailInput' type="email" value={email} onChange={e => setEmail(e.target.value)} />

          <label htmlFor="password" className="loginPasswordLable">Password</label>
          <input type="password" className="loginPasswordInput" value={password} onChange={e => setPassword(e.target.value)} />

          <button className='loginBtn' type='submit' onClick={signInHandler}>Continue</button>

          <p className='loginTermsConditions'>By continuing, you agree to Amazon's <span className='loginTermsConditionsInnerTxt'>Conditions of Use</span> and <span className='loginTermsConditionsInnerTxt'>Privacy Notice</span>.</p>
        </form>
      </div>

      <div className="signUpRedirectContainer">
        <h1 className='signUpHeading'>New to Amazon?</h1>

        <button className='signUpNavigateBtn' type='submit' onClick={signUpClickHandler}>Create your Amazon account</button>
      </div>
    </div>
  )
}

export default Login

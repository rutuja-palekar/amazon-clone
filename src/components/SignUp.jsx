import React, { useState } from 'react'
import './SignUp.css'
import AmazonSignInLogo from '../imagesicons/AmazonSignInLogo.png'
import inImg from '../imagesicons/inImg.png'
import { Link, useNavigate } from 'react-router-dom'
import CountryCodes from './CountryCodes'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { SignalCellularNullRounded } from '@mui/icons-material'


function SignUp() {
    const [selectedCountry, setSelectedCountry] = useState({ mobileCode: '+91' });

    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState('');

    const [emailId, setEmailId] = useState('');
    const [emailIdError, setEmailIdError] = useState('');

    const [mobileNo, setMobileNo] = useState('');
    const [mobileNoError, setMobileNoError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate()

    const validateFullName = () => {
        const namePattern = /^[a-zA-Z]+( [a-zA-Z]+)*$/;

        if (fullName === "") {
            setFullNameError("Enter your name")
        }

        else if (!namePattern.test(fullName)) {
            setFullNameError("Name cannot include invalid characters")
        }

        else if (fullName.length < 10) {
            setFullNameError("Name should not be too short")
        }

        else if (fullName.length > 100) {
            setFullNameError("Name should not be too long")
        }

        else {
            setFullNameError("")
        }
    }

    const validateEmailId = () => {

        const emailIdPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (emailId === "") {
            setEmailIdError("Enter your email")
        }

        else if (!emailIdPattern.test(emailId)) {
            setEmailIdError("Invalid Email Id")
        }

        else {
            setEmailIdError("")
        }
    }

    const validateMobileNo = () => {
        const mobileNoPattern = /^\d{1,15}$/;

        if (mobileNo === "") {
            setMobileNoError("Enter your mobile number")
        }

        else if (!mobileNoPattern.test(mobileNo)) {
            setMobileNoError("Invalid mobile number")
        }

        else {
            setMobileNoError("")
        }
    }

    const validatePassword = () => {

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=^\S*$)[a-zA-Z\d!@#\$%\^&\*]{8,16}$/;

        if (password === "") {
            setPasswordError("Enter your password")
        }

        else if (!passwordPattern.test(password)) {
            setPasswordError("A password should be between 6 and 16 characters in length, containing at least one uppercase letter, one lowercase letter, one digit, one special character, and should not include any white spaces");
        }

        else if (password.length < 6) {
            setPasswordError("Passwords must be at least 6 characters")
        }

        else {
            setPasswordError("")
        }
    }


    const countryChangeHandler = (e) => {
        const selectedValue = e.target.value;
        const selectedCountryInfo = CountryCodes.find((country) => country.value === selectedValue);

        if (selectedCountryInfo) {
            setSelectedCountry(selectedCountryInfo);
        }
        else {
            setSelectedCountry(null);
        }
    };


    const signUpUser = async () => {
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, emailId, password);

            await updateProfile(userCredential.user, { displayName: fullName });

            // If an email is provided, send a verification email
            // if (emailId) {
            //     await sendEmailVerification(userCredential.user);
            // }

            const mobileNumber = selectedCountry ? `${selectedCountry.mobileCode}${mobileNo}` : `+91${mobileNo}`;


            // Set the user's document ID to their UID
            const db = getFirestore();
            const userUID = userCredential.user.uid;
            const userDocRef = doc(db, "users", userUID);
    
            await setDoc(userDocRef, {
                fullName: fullName,
                mobileNo: mobileNumber,
                emailId: emailId,
                password: password,
            });

        } catch (error) {
            alert("Error registering user: " + error.message);
        }
    };



    const signUpHandler = async (e) => {
        e.preventDefault();
        validateFullName();
        validateMobileNo();
        validateEmailId();
        validatePassword();


        if (selectedCountry) {
            signUpUser()
                .then(() => {
                    navigate('/');
                })
                .catch((error) => {
                    alert("Account can't be created:", error);
                });
        }
    };


    return (
        <section className='signUpWrapper'>
            <div className='signUpLogoContainer'>
                <Link to='/'>
                    <img className='AmazonSignUpLogo' src={AmazonSignInLogo} alt="Logo" />
                    <img className='inImg' src={inImg} alt="Logo" />
                </Link>
            </div>

            <div className="signUpContainer">
                <form action="post" className="signUpForm">
                    <h1 className="signUpFormHeading">Create Account</h1>

                    <fieldset className="errorMessage">
                        <label htmlFor="signUpFullNameLabel" className="signUpNameLabel">Your name</label>
                        <input type="text" className="signUpNameInput" id='signUpFullNameLabel' placeholder='First and last name' onChange={e => setFullName(e.target.value)} onBlur={validateFullName} />
                        <span className='errorMsg'>{fullNameError}</span>
                    </fieldset>

                    <fieldset className="errorMessage">
                        <label htmlFor="signUpMobileNoLabel" className='signUpMobileNoLabel'>Mobile Number</label>

                        <div className="signUpMobileNoContainer">
                            <div className="signUpCountryCodesMobileInput">
                                <select
                                    className='countryCodesDropdownMenu'
                                    onChange={countryChangeHandler}
                                    value={selectedCountry ? selectedCountry.value : ''}
                                >

                                    {CountryCodes.map((country) => (
                                        <option
                                            key={country.value}
                                            value={country.value}
                                            data-alpha3code={country.alpha3code}
                                        >
                                            {`${country.alpha3code} ${country.mobileCode}`}
                                        </option>
                                    ))}
                                </select>


                                <div className='mobileNoInputErrorWrapper'>
                                    <input type="text" className="signUpMobileNoInput" id='signUpMobileNoLabel' placeholder='Mobile number' onChange={e => setMobileNo(e.target.value)} onBlur={validateMobileNo} />
                                    <div>
                                        <span className="errorMsg" id='signUpMobileNoErrorMsg'>{mobileNoError}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </fieldset>

                    <fieldset className="errorMessage">
                        <label htmlFor="signUpEmailLabel" className="signUpEmailLabel">Email</label>
                        <input type="text" className="signUpEmailInput" id='signUpEmailLabel' onChange={e => setEmailId(e.target.value)} onBlur={validateEmailId} />
                        <span className='errorMsg'>{emailIdError}</span>
                    </fieldset>

                    <fieldset className="errorMessage">
                        <label htmlFor="signUpPasswordLabel" className="signUpPasswordLabel">Password</label>
                        <input type="password" className="signUpPasswordInput" id='signUpPasswordLabel' placeholder='At least 6 characters' onChange={e => setPassword(e.target.value)} onBlur={validatePassword} />
                        <span className="errorMsg">{passwordError}</span>
                    </fieldset>

                    <button className="signUpBtn" type='submit' onClick={signUpHandler}>Continue</button>


                    <p className='signUpTermsConditions'>Already have an account? <Link to='/login' className='signUpSignInRedirectLink'> Sign in </Link></p>


                    <p className='signUpTermsConditions'>By continuing, you agree to Amazon's <span className='signUpTermsConditionsInnerTxt'>Conditions of Use</span> and <span className='signUpTermsConditionsInnerTxt'>Privacy Notice</span>.</p>
                </form>
            </div >
        </section >
    )
}

export default SignUp
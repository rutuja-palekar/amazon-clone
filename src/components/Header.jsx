import React from 'react'
import './Header.css'
import AmazonLogo from '../imagesicons/Amazon.png'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider.jsx'
import { auth } from './firebase';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

function Header() {
    const [{ cart, user }, dispatch] = useStateValue()

    const signOutHandler = () => {
        if (user) {
            auth.signOut();
        }
    }

    const getFirstName = (fullName) => {
        if (fullName) {
            const nameParts = fullName.split(' ');
            return nameParts[0];
        }
        return '';
    }

    const LocationOnOutlinedIconStyle = {
        fontSize: '1.5rem',
        marginTop: '-0.2rem'
    }

    const ShoppingCartOutlinedIconStyle = {
        fontSize: '1.7rem',
        marginTop: '0rem'
    }

    return (
        <header className='header'>

            <Link to="/">
                <img className='headerLogo' src={AmazonLogo} alt='Logo' />
            </Link>

            <div className="headerNav">
                <Link className='headerSelectAddressLink' to={!user ? '/login' : '/viewaddress'}>

                    <div className="navLocationSelectAddressMenus">
                        <span className="navMenuOne" id='navMenuSelectAddress'>{user ? `Deliver to ${getFirstName(user.displayName)}` : 'Hello'}</span>

                        <div className="locationSelectAddressWrapper">
                            <LocationOnOutlinedIcon style={LocationOnOutlinedIconStyle} />
                            <span className="navMenuTwo">{user ? '' : 'Select your address'}</span>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="headerSearch">
                <input type="text" className="headerSearchInput" />
                <SearchIcon className='searchIcon' />
            </div>

            <div className="headerNav">
                <Link className='headerLoginLink' to={!user && '/login'}>
                    <div className="navMenus" onClick={signOutHandler}>
                        <span className="navMenuOne">Hello, {!user ? 'Guest' : getFirstName(user.displayName)}</span>
                        <span className="navMenuTwo">{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>

                <div className="navMenus">
                    <span className="navMenuOne">Returns</span>
                    <span className="navMenuTwo">& Orders</span>
                </div>

                <Link to="/checkout">
                    <div className='cartIconContainer'>
                        <ShoppingCartOutlinedIcon style={ShoppingCartOutlinedIconStyle} />
                        <span className="navMenuTwo" id='headerCartCount'>{cart?.length}</span>
                    </div>
                </Link>

            </div>

        </header>
    )
}

export default Header
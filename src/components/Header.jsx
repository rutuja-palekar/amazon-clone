import React from 'react'
import './Header.css'
import AmazonLogo from '../imagesicons/Amazon.png'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider.jsx'

function Header() {
    const [{ cart }, dispatch] = useStateValue()

    console.log('cart:', cart);

    return (
        <header className='header'>

            <Link to="/">
                <img className='headerLogo' src={AmazonLogo} alt='Logo' />
            </Link>

            <div className="headerSearch">
                <input type="text" className="headerSearchInput" />
                <SearchIcon className='searchIcon' />
            </div>

            <div className="headerNav">

                <div className="navMenus">
                    <span className="navMenuOne">Hello Guest</span>
                    <span className="navMenuTwo">Sign In</span>

                </div>

                <div className="navMenus">
                    <span className="navMenuOne">Returns</span>
                    <span className="navMenuTwo">& Orders</span>
                </div>

                <div className="navMenus">
                    <span className="navMenuOne">Your</span>
                    <span className="navMenuTwo">Prime</span>
                </div>

                <Link to="/checkout">
                    <div className='cartIconContainer'>
                        <ShoppingCartOutlinedIcon style={{ fontSize: '2rem' }} />
                        <span className="navMenuTwo headerCartCount">{cart?.length}</span>
                    </div>
                </Link>

            </div>

        </header>
    )
}

export default Header
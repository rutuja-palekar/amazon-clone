import React from 'react'
import './Home.css'
import slideshowImageOne from '../imagesicons/slideshowImageOne.jpg'
import Product from './Product.jsx'
import Smartwatch from '../imagesicons/Smartwatch.jpg'
import GamingLaptop from '../imagesicons/GamingLaptop.jpg'
import Sunglasses from '../imagesicons/Sunglasses.jpg'
import DigitalCamera from '../imagesicons/DigitalCamera.jpg'
import StartupBook from '../imagesicons/StartupBook.jpg'
import UltraScreenMonitor from '../imagesicons/UltrascreenMonitor.jpg'

function Home() {

    return (
        <div className='home'>
            <div className="homeContainer">
                <img className='homeImage' src={slideshowImageOne} alt="Image is not available" />

                <div className="productRow">
                    <Product title="French Connection POP FIT Full Touch Smartwatch with Silicon Band" price={2095} image={Smartwatch} rating={5} id="1" />

                    <Product title="Lenovo SmartChoice IdeaPad Gaming 3 Laptop, 82K101KGIN" price={55990} image={GamingLaptop} rating={4} id="2" />
                </div>

                <div className="productRow">
                    <Product title="John Jacobs | Polarized & UV Protection Sunglasses For Men & Women" price={2089} image={Sunglasses} rating={4} id="3" />

                    <Product title="Canon Digital Camera EOS R100 RF-S18-45mm is STM Kit (Black)" price={49990} image={DigitalCamera} rating={5} id="4" />

                    <Product title="Daily Coffee & Startup Fundraising" price={599} image={StartupBook} rating={4} id="5" />
                </div>

                <div className="productRowThird">
                    <Product title="LG 49 inch Curved Ultragear Dual QHD Gaming Monitor with Vesa DisplayHDR, Premium Gaming Display, AMD FreeSync, HDMI, DP, Speakers, 49GR85DC, Black" price={119999} singleImage={UltraScreenMonitor} rating={5} id="6"/>
                </div>
            </div>
        </div>
    )
}

export default Home
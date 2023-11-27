import React, { useEffect, useState } from 'react'
import './Home.css'
import slideshowImageOne from '../imagesicons/slideshowImageOne.jpg'
import slideshowImageTwo from '../imagesicons/slideshowImageTwo.jpg'
import slideshowImageThree from '../imagesicons/slideshowImageThree.jpg'
import slideshowImageFour from '../imagesicons/slideshowImageFour.jpg'
import slideshowImageFive from '../imagesicons/slideshowImageFive.jpg'
import slideshowImageSix from '../imagesicons/slideshowImageSix.jpg'
import slideshowImageSeven from '../imagesicons/slideshowImageSeven.jpg'
import Product from './Product.jsx'
import Smartwatch from '../imagesicons/Smartwatch.jpg'
import GamingLaptop from '../imagesicons/GamingLaptop.jpg'
import Sunglasses from '../imagesicons/Sunglasses.jpg'
import DigitalCamera from '../imagesicons/DigitalCamera.jpg'
import StartupBook from '../imagesicons/StartupBook.jpg'
import UltraScreenMonitor from '../imagesicons/UltrascreenMonitor.jpg'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function Home() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const slideShowImages = [slideshowImageOne, slideshowImageTwo,slideshowImageThree, slideshowImageFour, slideshowImageFive,slideshowImageSix, slideshowImageSeven]

    useEffect(() => {
        // Change the image every 5 seconds
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideShowImages.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [])

    const showPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + slideShowImages.length) % slideShowImages.length);
    }

    const showNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideShowImages.length);
    }

    const slideShowBackArrowIconStyle = {
        position: 'absolute',
        top: '40.5%',
        left: '4%',
        transform: 'translate(-50%, -50%)',
        fontSize: '3rem',
        fontColor: '#fff',
        cursor: 'pointer',
        zIndex: '1'
    }

    const slideShowForwardArrowIconStyle = {
        position: 'absolute',
        top: '40%',
        left: '97%',
        transform: 'translate(-50%, -50%)',
        fontSize: '3rem',
        cursor: 'pointer',
        zIndex: '1'
    }

    return (
        <div className='home'>
            <div className="homeContainer">

                <img className='homeImage' src={slideShowImages[currentImageIndex]} alt="Image is not available" />

                <ArrowBackIosIcon onClick={showPreviousImage} style={slideShowBackArrowIconStyle} />
                <ArrowForwardIosIcon onClick={showNextImage} style={slideShowForwardArrowIconStyle} />

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
                    <Product title="LG 49 inch Curved Ultragear Dual QHD Gaming Monitor with Vesa DisplayHDR, Premium Gaming Display, AMD FreeSync, HDMI, DP, Speakers, 49GR85DC, Black" price={119999} singleImage={UltraScreenMonitor} rating={5} id="6" />
                </div>
            </div>
        </div>
    )
}

export default Home
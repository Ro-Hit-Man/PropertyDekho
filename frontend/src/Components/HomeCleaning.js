import React from 'react'
import Footer from '../Partials/Footer'
import PropertyService from '../Partials/PropertyService'
import '../Styles/HomeCleaning.css'

export default function HomeCleaning() {
    return (
        <div className='home-cleaning-container'>
            <div className='home-cleaning-banner'>
                <img src='images/home_cleaning.jpg'></img>
                <h1>Home Cleaning</h1>
            </div>
            <div className='home-cleaning-services-wrapper'>
                <h3>Services We Offer</h3>
                <p>Choose the service that best suits you</p>
                <div className='home-cleaning-services'>
                    <div className='home-cleaning-services-item'>
                        <img src='images/deepHomeCleaning.jpg'></img>
                        <h4>Deep Home Cleaning</h4>
                        <button>View Packages</button>
                    </div>
                    <div className='home-cleaning-services-item'>
                        <img src='images/bathroomCleaning.jpg'></img>
                        <h4>Bathroom Cleaning</h4>
                        <button>View Packages</button>
                    </div>
                    <div className='home-cleaning-services-item'>
                        <img src='images/kitchenCleaning.jpg'></img>
                        <h4>Kitchen Cleaning</h4>
                        <button>View Packages</button>
                    </div>
                    <div className='home-cleaning-services-item'>
                        <img src='images/sofaCleaning.jpg'></img>
                        <h4>Sofa Cleaning</h4>
                        <button>View Packages</button>
                    </div>
                </div>
            </div>
            <PropertyService />
            <Footer />
        </div>
    )
}

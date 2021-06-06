import React from 'react'
import Footer from '../Partials/Footer'
import PropertyService from '../Partials/PropertyService'

export default function Sanitization() {
    return (
        <div className='home-cleaning-container'>
        <div className='home-cleaning-banner'>
            <img src='images/sanitization.jpg'></img>
            <h1 style={{left:'10%'}}>Sanitization</h1>
        </div>
        <div className='home-cleaning-services-wrapper'>
            <h3>Services We Offer</h3>
            <p>Choose the service that best suits you</p>
            <div className='home-cleaning-services'>
                <div className='home-cleaning-services-item'>
                    <img src='images/s1.jpg'></img>
                    <h4>Home Sanitization</h4>
                    <button>View Packages</button>
                </div>
            </div>
        </div>
        <PropertyService />
        <Footer/>
    </div>
    )
}

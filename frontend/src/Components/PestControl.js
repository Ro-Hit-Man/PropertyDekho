import React from 'react'
import Footer from '../Partials/Footer'
import PropertyService from '../Partials/PropertyService'

export default function PestControl() {
    return (
        <div className='home-cleaning-container'>
            <div className='home-cleaning-banner'>
                <img style={{height:'350px'}} src='images/pc.jpg'></img>
                <h1 style={{top:'50%',left:'57%'}}>Pest Control</h1>
            </div>
            <div className='home-cleaning-services-wrapper'>
                <h3>Services We Offer</h3>
                <p>Choose the service that best suits you</p>
                <div className='home-cleaning-services'>
                    <div className='home-cleaning-services-item'>
                        <img src='images/pc1.jpg'></img>
                        <h4>Cockroch & Ant Control</h4>
                        <button>View Packages</button>
                    </div>
                    <div className='home-cleaning-services-item'>
                        <img src='images/pc2.jpg'></img>
                        <h4>Termite Control</h4>
                        <button>View Packages</button>
                    </div>
                    <div className='home-cleaning-services-item'>
                        <img src='images/pc3.jpg'></img>
                        <h4>Bedbug Control</h4>
                        <button>View Packages</button>
                    </div>
                    <div className='home-cleaning-services-item'>
                        <img src='images/pc4.jpg'></img>
                        <h4>Mosquito Control</h4>
                        <button>View Packages</button>
                    </div>
                </div>
            </div>
            <PropertyService />
            <Footer/>
        </div>
    )
}

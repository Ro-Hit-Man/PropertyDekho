import axios from 'axios';
import React, { Component } from 'react'
import SimpleImageSlider from 'react-simple-image-slider';

export class Details extends Component {

    constructor(props){
        super(props);
        this.state={
            property:{},
            id:props.match.params.id
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3000/detailProperty?id="+this.state.id).then((res)=>{
            this.setState({
                property: res.data.data[0]
            });
        });
    }

    images = [
        { url: "images/property-1.jpg" },
        { url: "images/property-2.jpg" },
        { url: "images/property-3.jpg" },
        { url: "images/property-4.jpg" },
        { url: "images/property-5.jpg" },
        { url: "images/property-6.jpg" },
        { url: "images/property-7.jpg" },
      ];


    render() {
        return (
            <div class='details-container'>
                <div class='carosuel-div'>
                    <SimpleImageSlider
                        width={1500}
                        height={500}
                        images={this.images}
                        showBullets={true}
                        showNavs={true}
                        navStyle={1}
                        navMargin={30}
                        navSize={50}
                        slideDuration={0.5}
                        useGPURender = {true}
                        style = {{ margin:'0 auto' }}
                        bgColor={'#6c33a3'}
                    />
                </div>
                <div class='details-div'>
                    <h1>{this.state.property.propertyTitle} - <span>{this.state.property.areaSize} sq ft</span></h1>
                    <span class='location-span'>{this.state.property.location}</span>
                    <h2>{this.state.property.price}</h2>
                    <div class='status-div'>
                        <div>
                            <span>Status</span>
                            <h3>Ready To Move</h3>
                        </div>
                        <div>
                            <span>Bedroom</span>
                            <h3>{this.state.property.bedrooms}</h3>
                        </div>
                        <div>
                            <span>Bathroom</span>
                            <h3>{this.state.property.bathrooms}</h3>
                        </div>
                    </div>
                    <div class='details-description-div'>
                        <h2>Description</h2>
                        <p>{this.state.property.description}</p> 
                    </div>
                    <div class='details-amenities'>
                        <h2>Amenities</h2>
                        <div class='details-amenities-div'>
                            <div>
                                <img src='intercom.png'></img>
                                <span>Intercom</span>
                            </div>
                            <div>
                                <img src='pwer-backup.png'></img>
                                <span>Power Backup</span>
                            </div>
                            <div>
                                <img src='lift.png'></img>
                                <span>Lift</span>
                            </div>
                            <div>
                                <img src='i-pool.png'></img>
                                <span>Swimming Pool</span>
                            </div>
                            <div>
                                <img src='i-car.png'></img>
                                <span>Parking</span>
                            </div>
                            <div>
                                <img src='gym.png'></img>
                                <span>Gym</span>
                            </div>
                        </div>
                        <div class='details-amenities-div'>
                            <div>
                                <img src='sports.png'></img>
                                <span>Sports Facility</span>
                            </div>
                            <div>
                                <img src='track.png'></img>
                                <span>Jogging Track</span>
                            </div>
                            <div>
                                <img src='security.png'></img>
                                <span>24X7 Security</span>
                            </div>
                            <div>
                                <img src='garden.png'></img>
                                <span>Garden</span>
                            </div>
                            <div>
                                <img src='laundry.png'></img>
                                <span>Laundry</span>
                            </div>
                            <div>
                                <img src='basement.png'></img>
                                <span>Basement</span>
                            </div>
                        </div>
                    </div>
                    <div class='details-furnishings'>
                        <h2>Furnishings</h2>
                        <div class='details-furnishings-div'>
                            <div>
                                <img src='gas.png'></img>
                                <span>Gas Connection</span>
                            </div>
                            <div>
                                <img src='microwave.png'></img>
                                <span>Microwave</span>
                            </div>
                            <div>
                                <img src='sofa.png'></img>
                                <span>Sofa</span>
                            </div>
                            <div>
                                <img src='ac.png'></img>
                                <span>AC</span>
                            </div>
                            <div>
                                <img src='wardrobe.png'></img>
                                <span>Wardrobe</span>
                            </div>
                            <div>
                                <img src='tv.png'></img>
                                <span>TV</span>
                            </div>
                        </div>
                        <div class='details-furnishings-div'>
                            <div>
                                <img src='refrigerator.png'></img>
                                <span>Refrigerator</span>
                            </div>
                            <div>
                                <img src='wifi.png'></img>
                                <span>Wifi</span>
                            </div>
                            <div>
                                <img src='dining-table.png'></img>
                                <span>Dining Table</span>
                            </div>
                            <div>
                                <img src='bed.png'></img>
                                <span>Bed</span>
                            </div>
                            <div>
                                <img src='barbeque.png'></img>
                                <span>Barbeque</span>
                            </div>
                            <div>
                                <img src='water-heater.png'></img>
                                <span>Water Heater</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='contact-div'>
                    <img src='favicon.png'></img>
                    <h3>Connect with the owner right now</h3>
                    <form>
                       <input type='text' placeholder='Enter Name' name='name' id='name'></input>
                       <input type='emial' placeholder='Enter Email' name='email' id='email' ></input>
                       <input type='text' placeholder='Mobile Number' name='number' id='number' ></input>
                       <button>Connect Now</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Details


import axios from 'axios';
import React, { Component } from 'react'
import './Details.css'

export class Details extends Component {

    constructor(props){
        super(props);
        this.state={
            property:{},
            images:[],
            id:props.match.params.id
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3000/detailProperty?id="+this.state.id).then((res)=>{
            this.setState({
                property: res.data.data[0].PropertyDetails,
                images:res.data.data[0].PropertyImages
            });
        });
    }


    render() {
        return (
            <div class='details-container'>
                <div className='detail-carousel-div'>
                    <div id="detail-carousel" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#detail-carousel" data-slide-to="0" class="active"></li>
                            <li data-target="#detail-carousel" data-slide-to="1"></li>
                            <li data-target="#detail-carousel" data-slide-to="2"></li>
                            <li data-target="#detail-carousel" data-slide-to="3"></li>
                            <li data-target="#detail-carousel" data-slide-to="4"></li>
                            <li data-target="#detail-carousel" data-slide-to="5"></li>
                            <li data-target="#detail-carousel" data-slide-to="6"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src={"backend/userUploads/"+this.state.images[0]} alt="No Image"/>
                            </div>
                            <div class="carousel-item">
                                <img src={"backend/userUploads/"+this.state.images[1]} alt="No Image"/>
                            </div>
                            <div class="carousel-item">
                                <img src={"backend/userUploads/"+this.state.images[2]} alt="No Image"/>
                            </div>
                            <div class="carousel-item">
                                <img src={"backend/userUploads/"+this.state.images[3]} alt="No Image"/>
                            </div>
                            <div class="carousel-item">
                                <img src={"backend/userUploads/"+this.state.images[4]} alt="No Image"/>
                            </div>
                            <div class="carousel-item">
                                <img src={"backend/userUploads/"+this.state.images[5]} alt="NO Image"/>
                            </div>
                            <div class="carousel-item">
                                <img src={"backend/userUploads/"+this.state.images[6]} alt="No Image"/>
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#detail-carousel" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#detail-carousel" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div class='details-div'>
                    <h1>{this.state.property.propertyTitle} - <span>{this.state.property.areaSize} sq ft</span></h1>
                    <span class='location-span'>{this.state.property.location} , {this.state.property.landmark} , {this.state.property.city} , {this.state.property.state} -- {this.state.property.zipcode}</span>
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
                                <img src='images/intercom.png'></img>
                                {this.state.property.intercom == "true"?<span style={{color: "green"}}>Intercom</span>:<span style={{color: "red"}}><del>Intercom</del></span>}
                            </div>
                            <div>
                                <img src='images/pwer-backup.png'></img>
                                {this.state.property.powerBackup == "true"?<span style={{color: "green"}}>Power Backup</span>:<span style={{color: "red"}}><del>Power Backup</del></span>}
                            </div>
                            <div>
                                <img src='images/lift.png'></img>
                                {this.state.property.lift == "true"?<span style={{color: "green"}}>Lift</span>:<span style={{color: "red"}}><del>Lift</del></span>}
                            </div>
                            <div>
                                <img src='images/i-pool.png'></img>
                                {this.state.property.swimmingPool == "true"?<span style={{color: "green"}}>Swimmimg Pool</span>:<span style={{color: "red"}}><del>Swimming Pool</del></span>}
                            </div>
                            <div>
                                <img src='images/i-car.png'></img>
                                {this.state.property.parking == "true"?<span style={{color: "green"}}>Parking</span>:<span style={{color: "red"}}><del>Parking</del></span>}
                            </div>
                            <div>
                                <img src='images/gym.png'></img>
                                {this.state.property.gym == "true"?<span style={{color: "green"}}>Gym</span>:<span style={{color: "red"}}><del>Gym</del></span>}
                            </div>
                        </div>
                        <div class='details-amenities-div'>
                            <div>
                                <img src='images/sports.png'></img>
                                {this.state.property.sportsFacility == "true"?<span style={{color: "green"}}>Sports Facility</span>:<span style={{color: "red"}}><del>Sports Facility</del></span>}
                            </div>
                            <div>
                                <img src='images/track.png'></img>
                                {this.state.property.jogging == "true"?<span style={{color: "green"}}>Jogging Track</span>:<span style={{color: "red"}}><del>Jogging Track</del></span>}
                            </div>
                            <div>
                                <img src='images/security.png'></img>
                                {this.state.property.security == "true"?<span style={{color: "green"}}>24X7 Security</span>:<span style={{color: "red"}}><del>24X7 Security</del></span>}
                            </div>
                            <div>
                                <img src='images/garden.png'></img>
                                {this.state.property.garden == "true"?<span style={{color: "green"}}>Garden</span>:<span style={{color: "red"}}><del>Garden</del></span>}
                            </div>
                            <div>
                                <img src='images/laundry.png'></img>
                                {this.state.property.laundry == "true"?<span style={{color: "green"}}>Laundry</span>:<span style={{color: "red"}}><del>Laundry</del></span>}
                            </div>
                            <div>
                                <img src='images/basement.png'></img>
                                {this.state.property.basement == "true"?<span style={{color: "green"}}>Basement</span>:<span style={{color: "red"}}><del>Basement</del></span>}
                            </div>
                        </div>
                    </div>
                    <div class='details-furnishings'>
                        <h2>Furnishings</h2>
                        <div class='details-furnishings-div'>
                            <div>
                                <img src='images/gas.png'></img>
                                {this.state.property.gas == "true"?<span style={{color: "green"}}>Gas Connection</span>:<span style={{color: "red"}}><del>Gas Connection</del></span>}
                            </div>
                            <div>
                                <img src='images/microwave.png'></img>
                                {this.state.property.microwave == "true"?<span style={{color: "green"}}>Microwave</span>:<span style={{color: "red"}}><del>Microwave</del></span>}
                            </div>
                            <div>
                                <img src='images/sofa.png'></img>
                                {this.state.property.sofa == "true"?<span style={{color: "green"}}>Sofa</span>:<span style={{color: "red"}}><del>Sofa</del></span>}
                            </div>
                            <div>
                                <img src='images/ac.png'></img>
                                {this.state.property.ac == "true"?<span style={{color: "green"}}>AC</span>:<span style={{color: "red"}}><del>AC</del></span>}
                            </div>
                            <div>
                                <img src='images/wardrobe.png'></img>
                                {this.state.property.wardrobe == "true"?<span style={{color: "green"}}>Wardrobe</span>:<span style={{color: "red"}}><del>Wardrobe</del></span>}
                            </div>
                            <div>
                                <img src='images/tv.png'></img>
                                {this.state.property.tv == "true"?<span style={{color: "green"}}>TV</span>:<span style={{color: "red"}}><del>TV</del></span>}
                            </div>
                        </div>
                        <div class='details-furnishings-div'>
                            <div>
                                <img src='images/refrigerator.png'></img>
                                {this.state.property.refrigerator == "true"?<span style={{color: "green"}}>Refrigerator</span>:<span style={{color: "red"}}><del>Refrigerator</del></span>}
                            </div>
                            <div>
                                <img src='images/wifi.png'></img>
                                {this.state.property.wifi == "true"?<span style={{color: "green"}}>Wifi</span>:<span style={{color: "red"}}><del>Wifi</del></span>}
                            </div>
                            <div>
                                <img src='images/dining-table.png'></img>
                                {this.state.property.diningTable == "true"?<span style={{color: "green"}}>Dining Table</span>:<span style={{color: "red"}}><del>Dining Table</del></span>}
                            </div>
                            <div>
                                <img src='images/bed.png'></img>
                                {this.state.property.bed == "true"?<span style={{color: "green"}}>Bed</span>:<span style={{color: "red"}}><del>Bed</del></span>}
                            </div>
                            <div>
                                <img src='images/barbeque.png'></img>
                                {this.state.property.barbeque == "true"?<span style={{color: "green"}}>Barbeque</span>:<span style={{color: "red"}}><del>Barbeque</del></span>}
                            </div>
                            <div>
                                <img src='images/water-heater.png'></img>
                                {this.state.property.waterHeater == "true"?<span style={{color: "green"}}>Water Heater</span>:<span style={{color: "red"}}><del>Water Heater</del></span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div class='contact-div'>
                    <img src='images/favicon.png'></img>
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


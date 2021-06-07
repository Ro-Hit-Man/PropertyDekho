import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import '../Styles/Details.css'
import {baseUrl} from '../config';
import Footer from '../Partials/Footer';

export default function Details(props) {

    const [property, setproperty] = useState("");
    const [images, setimages] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState("");
    const [email, setEmail] = useState("");
    const [useremail, setuseremail] = useState("");
    const [usernumber, setusernumber] = useState("");
    const [username, setusername] = useState("");
    var emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;


    var id = props.match.params.id;

    useEffect(() => {
        axios.post(baseUrl+"detailProperty",{id}).then((res)=>{
                setproperty( res.data.data[0].PropertyDetails);
                setimages(res.data.data[0].PropertyImages);
                var userid = res.data.data[0].PropertyDetails.userId;
                console.log(userid);
                axios.post(baseUrl+'getUser',{id: userid}).then((res)=>{
                    setName(res.data.data[0].name);
                    setPic(res.data.data[0].imageUrl);
                    setEmail(res.data.data[0].email);
                });
        });
    }, []);

    function connect(){

        var data = {
            name : name,
            email: email,
            username: username,
            useremail: useremail,
            usernumber: usernumber,
            propertyname: property.propertyTitle,
            location: property.location+","+property.city+","+property.state
        }

            if(username == "" || username == null || username.length == 0){
                alert('Name cannot be Empty');
            }
            else if(!emailRegex.test(useremail) || useremail == ""){
                alert('Enter valid email address');
            }
            else if(usernumber.length<10 || usernumber.length>10 || usernumber == "" || usernumber == null){
                alert('Enter valid mobile number');
            }
            else{
                axios.post(baseUrl+'connect', data).then((res)=>{
                    alert(res.data.data);
                });
            }
        
    }

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
                                <img src={baseUrl+images[0]} alt="No Image"/>
                            </div>
                            <div class="carousel-item">
                                <img src={baseUrl+images[1]} alt="No Image"/>
                            </div>
                            <div class="carousel-item">
                                <img src={baseUrl+images[2]} alt="No Image"/>
                            </div>
                            <div class="carousel-item">
                                <img src={baseUrl+images[3]} alt="No Image"/>
                            </div>
                            <div class="carousel-item">
                                <img src={baseUrl+images[4]} alt="No Image"/>
                            </div>
                            <div class="carousel-item">
                                <img src={baseUrl+images[5]} alt="NO Image"/>
                            </div>
                            <div class="carousel-item">
                                <img src={baseUrl+images[6]} alt="No Image"/>
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
                    <h1>{property.propertyTitle} - <span>{property.areaSize} sq ft</span></h1>
                    <span class='location-span'>{property.location} , {property.landmark} , {property.city} , {property.state} -- {property.zipcode}</span>
                    <h2>{property.price}</h2>
                    <div class='status-div'>
                        <div>
                            <span>Status</span>
                            <h3>Ready To Move</h3>
                        </div>
                        <div>
                            <span>Bedroom</span>
                            <h3>{property.bedrooms}</h3>
                        </div>
                        <div>
                            <span>Bathroom</span>
                            <h3>{property.bathrooms}</h3>
                        </div>
                    </div>
                    <div class='details-description-div'>
                        <h2>Description</h2>
                        <p>{property.description}</p> 
                    </div>
                    <div class='details-amenities'>
                        <h2>Amenities</h2>
                        <div class='details-amenities-div'>
                            <div>
                                <img src='images/intercom.png'></img>
                                {property.intercom == "true"?<span style={{color: "green" ,textAlign:"center"}}>Intercom<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Intercom <br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/pwer-backup.png'></img>
                                {property.powerBackup == "true"?<span style={{color: "green" ,textAlign:"center"}}>Power Backup<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Power Backup<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/lift.png'></img>
                                {property.lift == "true"?<span style={{color: "green" ,textAlign:"center"}}>Lift<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Lift<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/i-pool.png'></img>
                                {property.swimmingPool == "true"?<span style={{color: "green" ,textAlign:"center"}}>Swimmimg Pool<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Swimming Pool<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/i-car.png'></img>
                                {property.parking == "true"?<span style={{color: "green" ,textAlign:"center"}}>Parking<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Parking<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/gym.png'></img>
                                {property.gym == "true"?<span style={{color: "green" ,textAlign:"center"}}>Gym<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Gym<br/> Not Available</del></span>}
                            </div>
                        </div>
                        <div class='details-amenities-div'>
                            <div>
                                <img src='images/sports.png'></img>
                                {property.sportsFacility == "true"?<span style={{color: "green" ,textAlign:"center"}}>Sports Facility<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Sports Facility<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/track.png'></img>
                                {property.jogging == "true"?<span style={{color: "green" ,textAlign:"center"}}>Jogging Track<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Jogging Track<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/security.png'></img>
                                {property.security == "true"?<span style={{color: "green" ,textAlign:"center"}}>24X7 Security<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>24X7 Security<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/garden.png'></img>
                                {property.garden == "true"?<span style={{color: "green" ,textAlign:"center"}}>Garden<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Garden<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/laundry.png'></img>
                                {property.laundry == "true"?<span style={{color: "green" ,textAlign:"center"}}>Laundry<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Laundry<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/basement.png'></img>
                                {property.basement == "true"?<span style={{color: "green" ,textAlign:"center"}}>Basement<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Basement<br/> Not Available</del></span>}
                            </div>
                        </div>
                    </div>
                    <div class='details-furnishings'>
                        <h2>Furnishings</h2>
                        <div class='details-furnishings-div'>
                            <div>
                                <img src='images/gas.png'></img>
                                {property.gas == "true"?<span style={{color: "green" ,textAlign:"center"}}>Gas Connection<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Gas Connection<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/microwave.png'></img>
                                {property.microwave == "true"?<span style={{color: "green" ,textAlign:"center"}}>Microwave<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Microwave<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/sofa.png'></img>
                                {property.sofa == "true"?<span style={{color: "green" ,textAlign:"center"}}>Sofa<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Sofa<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/ac.png'></img>
                                {property.ac == "true"?<span style={{color: "green" ,textAlign:"center"}}>AC<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>AC<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/wardrobe.png'></img>
                                {property.wardrobe == "true"?<span style={{color: "green" ,textAlign:"center"}}>Wardrobe<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Wardrobe<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/tv.png'></img>
                                {property.tv == "true"?<span style={{color: "green" ,textAlign:"center"}}>TV<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>TV<br/> Not Available</del></span>}
                            </div>
                        </div>
                        <div class='details-furnishings-div'>
                            <div>
                                <img src='images/refrigerator.png'></img>
                                {property.refrigerator == "true"?<span style={{color: "green" ,textAlign:"center"}}>Refrigerator<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Refrigerator<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/wifi.png'></img>
                                {property.wifi == "true"?<span style={{color: "green" ,textAlign:"center"}}>Wifi<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Wifi<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/dining-table.png'></img>
                                {property.diningTable == "true"?<span style={{color: "green" ,textAlign:"center"}}>Dining Table<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Dining Table<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/bed.png'></img>
                                {property.bed == "true"?<span style={{color: "green" ,textAlign:"center"}}>Bed<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Bed<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/barbeque.png'></img>
                                {property.barbeque == "true"?<span style={{color: "green" ,textAlign:"center"}}>Barbeque<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Barbeque<br/> Not Available</del></span>}
                            </div>
                            <div>
                                <img src='images/water-heater.png'></img>
                                {property.waterHeater == "true"?<span style={{color: "green" ,textAlign:"center"}}>Water Heater<br/>Available</span>:<span style={{color: "red" ,textAlign:"center"}}><del>Water Heater<br/> Not Available</del></span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div class='contact-div'>
                {pic == "" || pic == undefined?<img src="images/profile.png"></img>:<img src={baseUrl+pic}></img>}
                    <h3>{name}</h3>
                    <hr/>
                    <h4 style={{fontWeight:'lighter'}}>Connect with the owner right now</h4>
                    <hr/>  
                        <form>
                            <input type='text' placeholder='Enter Your Name' value={username} onChange={(e)=>{setusername(e.target.value);}}></input>
                            <input type='email' placeholder='Enter Your Email' value={useremail} onChange={(e)=>{setuseremail(e.target.value);}}></input>
                            <input type='text' placeholder="Enter Your Number" value={usernumber} onChange={(e)=>{setusernumber(e.target.value);}}></input>
                            <button onClick={()=>{connect();}}>CONNECT</button>
                        </form>
                </div>
                <Footer/>
            </div>
    )
}

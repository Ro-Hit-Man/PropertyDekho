import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {baseUrl} from '../config';
import Footer from '../Partials/Footer';
import '../Styles/Home.css'

export default function Home(props) {

    const [property, setProperty] = useState([]);

    const dispatch = useDispatch();
    const islogin = useSelector(state => state.isLogin);

    useEffect(() => {
        axios.post(baseUrl+"listProperty").then((res)=>{
            setProperty(res.data.data);
        });
    }, []);

    function showDetails(id){
        props.history.push("/Details/"+id);
    }

    function setName(e){
        var id = e;
        localStorage.setItem("CATAGORY", id);
    }

    var listProperty = property.map((p)=>{
        return <div className="item" key={p._id}>
                    <img id='img' src={baseUrl+p.PropertyImages[0]} alt=""/>
                    <span>{p.PropertyDetails.location}</span>
                    <h4>{p.PropertyDetails.propertyTitle}</h4>
                    <div>
                        <img src='images/home.png'></img>
                        <span>{p.PropertyDetails.areaSize} sq. ft.</span>
                    </div>
                <button onClick={()=>{showDetails(p._id)}}>VIEW DETAILS</button>
                </div>
    });

    return (
        <div className='home-container'>
            <div class='services-div'>
                    <h1>Introducing Property Services</h1>
                    <div class='services-wrapper'>
                        <div class='services-item'>
                            <img src='images/services-bg.png'></img>
                            <img class='service-img' src='images/i-trust.png'></img>
                            <NavLink to='/HomeCleaning'>
                            <h3 onMouseOver={()=>{setName('Home Cleaning');}}>Home Cleaning</h3>
                            </NavLink>
                        </div>
                        <div class='services-item'>
                            <img src='images/services-bg.png'></img>
                            <img class='service-img' src='images/i-choice.png'></img>
                            <NavLink to='/PestControl' exact>
                            <h3 onMouseOver={()=>{setName('Pest Control')}}>Pest Control</h3>
                            </NavLink>
                        </div>
                        <div class='services-item'>
                            <img src='images/services-bg.png'></img>
                            <img class='service-img' src='images/i-prefer.png'></img>
                            <NavLink to='Sanitization' exact>
                            <h3 onMouseOver={()=>{setName('Sanitizing')}}>Sanitizing</h3>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div class="featured-property">
                    <h1>Newly Uploaded Properties</h1>
                    <div class="featured-property-wrapper">
                            {listProperty}
                    </div>
                </div>
                
                <div class='post-div'>
                    <img class='cloud-img' src='images/bgr-cloud.png'></img>
                    <img class='advertise-img' src='images/advertice-sale.png'></img>
                    <img class='dots-img' src='images/bg-dots-big.png'></img>
                    <img class='ring-img' src='images/bgl-ring.png'></img>
                    <div>
                        <h1>Want to Sell <br/>Property?</h1>
                        <p>Let us create a tailored strategic marketing plan and keep track of the selling process.</p>
                        <NavLink exact to={islogin?"/PostProperty":"/Login"}><button>Post Property</button></NavLink>
                    </div>
                </div>
                <div class='choice-div'>
                    <h1>What Makes Us The Preferred Choice</h1>
                    <div class='choice-wrapper'>
                        <div class='choice-item'>
                            <img src='images/i-world-bg.png'></img>
                            <img class='choice-img' src='images/i-world.png'></img>
                            <h3>Maximum Choices</h3>
                        </div>
                        <div class='choice-item'>
                            <img src='images/i-fast-bg.png'></img>
                            <img class='choice-img' src='images/i-fast.png'></img>
                            <h3>Buyers Trust Us</h3>
                        </div>
                        <div class='choice-item'>
                            <img src='images/i-building-bg.png'></img>
                            <img class='choice-img' src='images/i-building.png'></img>
                            <h3>Seller Prefer Us</h3>
                        </div>
                        <div class='choice-item'>
                            <img src='images/i-commission-bg.png'></img>
                            <img class='choice-img' src='images/i-commission.png'></img>
                            <h3>Expert Guidance</h3>
                        </div>
                    </div>
                </div>
                <div class='download-div'>
                    <img class='app-bg-img' src='images/app-bg.png'></img>
                    <div class='download-content'>
                        <h1>Download Our App</h1>
                        <div class='app-detail1'>
                            <div><img src='images/bell.png'></img></div>
                            <div><img src='images/instant.png'></img></div>
                            <div><img src='images/heart.png'></img></div>
                        </div>
                        <div class='app-detail2'>
                            <div>Property alert</div>
                            <div>Instant connect</div>
                            <div>Mark favorite</div>
                        </div>
                        <div class='app-button-div'>
                            <div>
                                <img class='android-img' src='images/android.png'></img>
                                <button>PLAY STORE</button>
                            </div>
                            <div>
                                <img class='apple-img' src='images/apple.png'></img>
                                <button>APP STORE</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
    )
}

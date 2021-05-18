import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Home.css'

export default function Home(props) {

    const [property, setProperty] = useState([]);

    const islogin = useSelector(state => state.isLogin);
    const isBuyer = useSelector(state => state.canPostProperty);

    useEffect(() => {
        axios.get("http://localhost:3000/listProperty").then((res)=>{
            setProperty(res.data.data);
        });
    }, []);

    function showDetails(id){
        props.history.push("/Details/"+id);
    }

    var listProperty = property.map((p)=>{
        return <div className="item" key={p._id}>
                    <img id='proImg' src={"Details/backend/userUploads/"+p.PropertyImages[0]} alt=""/>
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
        <div>
                <div class='services-div'>
                    <h1>Introducing Property Services</h1>
                    <div class='services-wrapper'>
                        <div class='services-item'>
                            <img src='images/services-bg.png'></img>
                            <img class='service-img' src='images/i-expert.png'></img>
                            <h3>Home Loan</h3>
                        </div>
                        <div class='services-item'>
                            <img src='images/services-bg.png'></img>
                            <img class='service-img' src='images/i-trust.png'></img>
                            <h3>Home Cleaning</h3>
                        </div>
                        <div class='services-item'>
                            <img src='images/services-bg.png'></img>
                            <img class='service-img' src='images/i-choice.png'></img>
                            <h3>Pest Control</h3>
                        </div>
                        <div class='services-item'>
                            <img src='images/services-bg.png'></img>
                            <img class='service-img' src='images/i-prefer.png'></img>
                            <h3>Sanitizing</h3>
                        </div>
                    </div>
                </div>
                <div class="featured-property">
                    <h1>Featured Properties</h1>
                    <div class="featured-property-wrapper">
                            {listProperty}
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
                <div class='post-div'>
                    <img class='cloud-img' src='images/bgr-cloud.png'></img>
                    <img class='advertise-img' src='images/advertice-sale.png'></img>
                    <img class='dots-img' src='images/bg-dots-big.png'></img>
                    <img class='ring-img' src='images/bgl-ring.png'></img>
                    <div>
                        <h1>Want to Sell <br/>Property?</h1>
                        <p>Let us create a tailored strategic marketing plan and keep track of the selling process.</p>
                        {isBuyer?"":<NavLink exact to={islogin?"/PostProperty":"/Login"}><button>Post Property</button></NavLink>}
                    </div>
                </div>
                <div class='testimonial-section'>
                    <img src='images/bgl-cloud.png'></img>
                    <div class='img'>
                        <img src='images/testimonial.png'></img>
                    </div>
                    <div class='header'>
                        <h2>Check what’s our client <br/>say about us!</h2>
                    </div>
                    <div class='carousel-div'> 
                        <div id="carousel" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                                <li data-target="#carousel" data-slide-to="0" class="active"></li>
                                <li data-target="#carousel" data-slide-to="1"></li>
                                <li data-target="#carousel" data-slide-to="2"></li>
                            </ol>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <div class="quote-block">
                                        <p>Qorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam henit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis</p>			
                                        <div class="user-box">
                                            <img src="images/author-3.jpg" alt="client" class="client-pic"/>
                                            <div class="user-detail">
                                                <span>William Hunter</span>
                                                <span>Chicago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <div class="quote-block">
                                        <p>Qorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam henit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis</p>			
                                        <div class="user-box">
                                            <img src="images/author-2.jpg" alt="client" class="client-pic"/>
                                            <div class="user-detail">
                                                <span>Linda Riddik</span>
                                                <span>Chicago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <div class="quote-block">
                                        <p>Qorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam henit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis</p>			
                                        <div class="user-box">
                                            <img src="images/author-4.jpg" alt="client" class="client-pic"/>
                                            <div class="user-detail">
                                                <span>Rose Poll</span>
                                                <span>Chicago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
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
            </div>
    )
}

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Route,Switch,NavLink} from 'react-router-dom';
import Details from './Details';
import Home from './Home';
import Listing from './Listing';
import Login from './Login';
import PostProperty from './PostProperty';
import Profile from './Profile';
import Register from './Register';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


export default function Header(props) {

    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");
    const [id, setId] = useState("");

    const islogin = useSelector(state => state.isLogin);
    const isBuyer = useSelector(state => state.canPostProperty);
    const dispatch = useDispatch();

    function changeLiStyle(e){
        document.getElementById('buy').style.backgroundColor = "blueviolet";
        document.getElementById('plot').style.backgroundColor = "blueviolet";
        document.getElementById('rent').style.backgroundColor = "blueviolet";
        document.getElementById('pg').style.backgroundColor = "blueviolet";
        document.getElementById('house').style.backgroundColor = "blueviolet";
        document.getElementById('apartment').style.backgroundColor = "blueviolet";
        document.getElementById(e.target.id).style.backgroundColor = "rgb(45, 5, 83)";
        setId(e.target.id);
    }

    function showMenu(){
        document.getElementById('menu').style.display = "block";
    }

    function hideMenu(){
        document.getElementById('menu').style.display = "none";
    }

    function logout(){
        dispatch( {type:"LOGIN_FALSE"} );
        dispatch( {type:"LOGGEDOUT"} );
        dispatch( {type:"NOT_BUYER"} );
    }

    function search(){
        // props.history.push('/Listing');
    }

    return (
        <div>
                <div class='Header'>
                    <img src='images/properties.png'></img>
                    <div class='login-post-btn'>
                        <div id='post-btn-div'>
                            {isBuyer?"":<NavLink exact to={islogin?"/PostProperty":"/Login"}><button>Post Property <span>Free</span></button></NavLink>}
                        </div>
                         <div>
                         <img onClick={()=>{showMenu();}} src='images/menu.png'></img>
                         <div class='menu-div' id='menu'>
                            <ul>
                                <li id='close'><span onClick={()=>{hideMenu();}}>X</span></li>
                                {islogin?<NavLink exact to="/Profile"><li>My Profile</li></NavLink>:""}
                                {islogin?"":<NavLink exact to="/Login"><li>Login</li></NavLink>}
                                {islogin?"":<NavLink exact to="/Register"><li>Register</li></NavLink>}
                                {islogin?<li onClick={()=>{logout()}}>Logout</li>:""}
                            </ul>
                        </div>
                        </div>    
                    </div>
                    <h1>We will help to find your dream home</h1>
                    <div class='nav'>
                        <ul>
                            <li id='buy' onClick={(e)=>{changeLiStyle(e);}}>BUY</li>
                            <li id='rent' onClick={(e)=>{changeLiStyle(e);}}>RENT</li>
                            <li id='villa' onClick={(e)=>{changeLiStyle(e);}}>VILLA</li>
                            <li id='house' onClick={(e)=>{changeLiStyle(e);}}>HOUSE</li>
                            <li id='apartment' onClick={(e)=>{changeLiStyle(e);}}>APARTMENT</li>
                        </ul>
                    </div>
                    <div class='search-bar'>
                        <form>
                            <div class='search-wrapper'>
                                <img src='images/location.png' id='location-img'></img>
                                <img src='images/money.png' id='money-img'></img>
                                <input placeholder='Enter Location or Landmark' id='location' name='location' value={location} onChange={(e)=>{setLocation(e.target.value)}}></input>
                                <input placeholder='Budget' id='budget' name='budget' value={budget} onChange={(e)=>{setBudget(e.target.value)}}></input>
                                <button onClick={()=>{search();}}>SEARCH</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class='post-property'>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/PostProperty" exact component={PostProperty}/>
                    <Route path="/Login" exact component={Login}/>
                    <Route path="/Register" exact component={Register}/>
                    <Route path="/Listing" exact component={Listing}/>
                    <Route path="/Details/:id"  component={Details}/>
                    <Route path="/Profile" exact component={Profile}/>
                </Switch>
                </div>
            </div>
    )
}

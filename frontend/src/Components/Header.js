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
import '../Styles/Header.css'
import HomeCleaning from './HomeCleaning';
import PestControl from './PestControl';
import Sanitization from './Sanitization';
import PackageListing from './PackageListing';

export default function Header(props) {

    const [city, setCity] = useState("");

    const searchData = useSelector(state => state.searchData);
    const islogin = useSelector(state => state.isLogin);
    const isAdmin = useSelector(state => state.isAdmin);
    const dispatch = useDispatch();

    function logout(){
        dispatch( {type:"LOGIN_FALSE"} );
        dispatch( {type:"LOGGEDOUT"} );
        dispatch( {type:"NOT_ADMIN"} );
        localStorage.setItem("LOGIN_ID", "no");
        window.location.reload(true);
    }

    function search(){
        dispatch({type:"SEARCHED",payload:city});
    }
    return (
        <div>
                <div class='Header'>
                    <img src='images/properties.png'></img>
                    <div class='login-post-btn'>
                        <div id='post-btn-div'>
                            <NavLink exact to={islogin?"/PostProperty":"/Login"}><button>Post Property <span>Free</span></button></NavLink>
                        </div>
                         {islogin?<NavLink to='/Profile' exact><img id='user-img' src='images/user.png'></img></NavLink>:""}
                         { islogin? <img onClick={()=>{logout();}} id='logout-img' src='images/logout.png'></img> : "" }
                    </div>
                    <NavLink to='/' exact><button id='logo-btn'>PROPERTY<span>Dekho</span></button></NavLink>
                    <h2>We will help to find your dream home</h2>
                    <div class='nav'>
                        <ul>
                            <span>You can</span>
                            <li id='buy'>BUY</li>
                            <li id='rent'>RENT</li>
                            <span>Any</span>
                            <li id='villa'>VILLA</li>
                            <li id='house'>HOUSE</li>
                            <li id='apartment'>APARTMENT</li>
                        </ul>
                    </div>
                    <div class='search-bar'>
                        <form>
                            <div class='search-wrapper'>
                                <img src='images/location.png' id='location-img'></img>
                                <select onChange={(e)=>{setCity(e.target.value)}}  onClick={()=>{search();}}>
                                    <option value=''>Select City</option>
                                    <option value='Delhi'>Delhi</option>
                                    <option value='Mumbai'>Mumbai</option>
                                    <option value='Bangalore'>Bangalore</option>
                                    <option value='Jaipur'>Jaipur</option>    
                                </select>
                                <NavLink to='/Listing'><button>SEARCH</button></NavLink>
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
                    <Route path="/Listing" component={Listing}/>
                    <Route path="/Details/:id"  component={Details}/>
                    <Route path="/Profile" exact component={Profile}/>
                    <Route path="/HomeCleaning" exact component={HomeCleaning}/>
                    <Route path="/PestControl" exact component={PestControl}/>
                    <Route path="/Sanitization" exact component={Sanitization}/>
                    <Route path="/PackageListing" exact component={PackageListing}/>
                </Switch>
                </div>
            </div>
    )
}

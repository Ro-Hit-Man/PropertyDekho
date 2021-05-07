import React, { Component } from 'react'
import {Route,Switch,NavLink} from 'react-router-dom';
import Details from './Details';
import Home from './Home';
import Listing from './Listing';
import Login from './Login';
import PostProperty from './PostProperty';
import Profile from './Profile';
import Register from './Register';

export class Header extends Component {

    changeLiStyle(e){
        document.getElementById('buy').style.backgroundColor = "blueviolet";
        document.getElementById('plot').style.backgroundColor = "blueviolet";
        document.getElementById('rent').style.backgroundColor = "blueviolet";
        document.getElementById('pg').style.backgroundColor = "blueviolet";
        document.getElementById('house').style.backgroundColor = "blueviolet";
        document.getElementById('apartment').style.backgroundColor = "blueviolet";
        document.getElementById(e.target.id).style.backgroundColor = "rgb(45, 5, 83)";
        this.setState({id:e.target.id});
    }

    constructor(props)
    {
        super(props);
        this.state = {
            id:'',
            location:'',
            propertyType:'',
            budget:''
        }
    }

    getData(e)
    {
        this.setState(
            {
                [e.target.name]:e.target.value,
                propertyType:document.getElementById('propertyType').value
            });
    }
    printData()
    {
        alert(this.state.id + this.state.location + this.state.budget + this.state.propertyType);
    }

    showMenu(){
        document.getElementById('menu').style.display = "block";
    }
    hideMenu(){
        document.getElementById('menu').style.display = "none";
    }

    render() {
        return (
            <div>
                <div class='Header'>
                    <img src='images/properties.png'></img>
                    <div class='login-post-btn'>
                        <NavLink exact to="/PostProperty"><button>Post Property <span>Free</span></button></NavLink>         
                        <img onClick={()=>{this.showMenu();}} src='images/menu.png'></img>
                        <div class='menu-div' id='menu'>
                            <ul>
                                <li id='close'><span onClick={()=>{this.hideMenu();}}>X</span></li>
                                <NavLink exact to="/Profile"><li>My Profile</li></NavLink>
                                <NavLink exact to="/Login"><li>Login</li></NavLink>
                                <NavLink exact to="/Register"><li>Register</li></NavLink>
                            </ul>
                        </div>
                    </div>
                    <h1>We will help to find your dream home</h1>
                    <div class='nav'>
                        <ul>
                            <li id='buy' onClick={(e)=>{this.changeLiStyle(e);}}>BUY</li>
                            <li id='rent' onClick={(e)=>{this.changeLiStyle(e);}}>RENT</li>
                            <li id='villa' onClick={(e)=>{this.changeLiStyle(e);}}>VILLA</li>
                            <li id='house' onClick={(e)=>{this.changeLiStyle(e);}}>HOUSE</li>
                            <li id='apartment' onClick={(e)=>{this.changeLiStyle(e);}}>APARTMENT</li>
                        </ul>
                    </div>
                    <div class='search-bar'>
                        <form>
                            <div class='search-wrapper'>
                                <img src='images/location.png' id='location-img'></img>
                                <img src='images/money.png' id='money-img'></img>
                                <input placeholder='Enter Location or Landmark' id='location' name='location' value={this.state.location} onChange={(e)=>{this.getData(e);}}></input>
                                <input placeholder='Budget' id='budget' name='budget' value={this.state.budget} onChange={(e)=>{this.getData(e);}}></input>
                                <NavLink exact to='/Listing'><button>SEARCH</button></NavLink>
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
}

export default Header

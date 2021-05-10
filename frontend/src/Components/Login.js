import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            email:'',
            password:'',
        }
    }

    getDataFromLoginForm(e)
    {
        this.setState({[e.target.name]:e.target.value});
    }

    login(){
        axios.get('http://localhost:3000/loginUser?email='+this.state.email+'&password='+this.state.password).then((res)=>{
            if(res.data.data[0] == undefined){
                alert("Please Enter Valid Email or Password");
            }
            else{
                alert("Hello "+res.data.data[0].name+" you are successfully logged in.");
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
            }
        });
    }

    render() {
        return (
            <div class='login-container'>
                <div class='login-wrapper'>
                    <h1>Login</h1>
                    <form>
                        <input id='email' placeholder='Enter Email Id or Phone Number' name='email' value={this.state.email} onChange={(e)=>{this.getDataFromLoginForm(e);}}></input>
                        <input id='password' type='password' placeholder='Enter Password' name='password' value={this.state.password} onChange={(e)=>{this.getDataFromLoginForm(e);}}></input>
                        <button type='button' onClick={()=>{this.login();}}>LOGIN</button>
                    </form>
                    <hr/><span>or login using</span>
                    <div class='login-option'>
                        <div class='facebook'>
                            <img src='/images/facebook.png'></img>
                            <span>Facebook</span>
                        </div>
                        <div class='google'>
                            <img src='images/google+.png'></img>
                            <span>Google+</span>
                        </div>
                    </div>
                    <NavLink exact to='/Register'><p>Don't have an account?<span>Sign Up</span></p></NavLink>
                </div>
            </div>
        )
    }
}

export default Login

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            username:'',
            password:'',
            isValid:true,
            passwordRegex : /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
        }
    }

    getDataFromLoginForm(e)
    {
        this.setState({[e.target.name]:e.target.value});
    }

    render() {
        return (
            <div class='login-container'>
                <div class='login-wrapper'>
                    <h1>Login</h1>
                    <form>
                        <input id='username' placeholder='Enter Email Id or Phone Number' name='username' value={this.state.username} onChange={(e)=>{this.getDataFromLoginForm(e);}}></input>
                        <input id='password' type='password' placeholder='Enter Password' name='password' value={this.state.password} onChange={(e)=>{this.getDataFromLoginForm(e);}}></input>
                        <button>LOGIN</button>
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

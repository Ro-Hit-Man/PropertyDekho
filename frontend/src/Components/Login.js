import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {baseUrl} from '../config';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import '../Styles/Login.css';
import Footer from '../Partials/Footer';

export default function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    function login(){
        axios.post(baseUrl+'loginUser',{email,password}).then((res)=>{
            if(res.data.data[0] == undefined){
                alert("Please Enter Valid Email or Password");
            }
            else{
                alert("Hello "+res.data.data[0].name+" you are successfully logged in.");
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                dispatch({type: "LOGIN_TRUE"});
                if(res.data.data[0].admin){
                    dispatch({type: "ADMIN"});
                }
                var uid = res.data.data[0]._id;
                dispatch({type: "LOGGEDIN",payload: uid });
                localStorage.setItem("LOGIN_ID", uid);
                props.history.push('/');
            }
        });
    }

    function forgotPassword(){
        if(email == "" || email == undefined){
            alert("First Enter your email then request for password recovery");
        }
        else{
            axios.post(baseUrl+'forgotPassword',{email}).then((res)=>{
                alert(res.data.data);
            });
        }
    }

    function responseGoogle(response) {
        var email = response.profileObj.email;
        var id = response.profileObj.googleId;
        axios.post('http://localhost:3000/loginGoogleUser', {id}).then((res)=>{
            if(res.data.data[0] == undefined){
                axios.post(baseUrl+'checkGoogleUser', {email}).then((res)=>{
                    if(res.data.data[0] == undefined){
                        var user = {
                            name: response.profileObj.name,
                            googleId : response.profileObj.googleId,
                            email : response.profileObj.email,
                            imageUrl : response.profileObj.imageUrl,
                            admin:""
                        }
                       axios.post('http://localhost:3000/registerGoogleUser',user).then((res)=>{
                           alert("Logged In successfully");
                           if(res.data.data === "User Registered"){
                              localStorage.setItem('G_ID', id);
                           }
                       });
                    }
                    else{
                        alert("please login with another account....otherwise login manually");
                    }
                });
            }
            else{
                alert("Hello "+res.data.data[0].name+" you are successfully logged in.");
                dispatch({type: "LOGIN_TRUE"});
                if(res.data.data[0].admin){
                    dispatch({type: "ADMIN"});
                }
                var uid = res.data.data[0]._id;
                dispatch({type: "LOGGEDIN",payload: uid });
                localStorage.setItem("LOGIN_ID", uid);
                props.history.push('/');
            }
        });
     }

    return (
        <div class='login-container'>
                <div class='login-wrapper'>
                    <h1>Login</h1>
                    <form>
                        <input id='email' placeholder='Enter Email Id or Phone Number' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                        <input id='password' type='password' placeholder='Enter Password' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                        <button type='button' onClick={()=>{login();}}>LOGIN</button>
                    </form>
                    <span id='forgot' onClick={()=>{forgotPassword();}}>forgot password?</span>
                    <div className='google-btn-outer'>
                        <div className='google-btn-inner'>
                            <GoogleLogin
                                clientId='1044529583764-bp2o5q8n70519mcev0ea6hcmgnf5v3rc.apps.googleusercontent.com'
                                render={renderProps => (
                                    <button id='google-btn' onClick={renderProps.onClick} disabled={renderProps.disabled}>LOGIN WITH GOOGLE</button>
                                )}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </div>
                    <NavLink exact to='/Register'><p>Don't have an account?<span>Sign Up</span></p></NavLink>
                </div>
                <Footer/>
            </div>
    )
}

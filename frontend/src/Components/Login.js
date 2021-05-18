import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './Login.css'

export default function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    function login(){
        axios.get('http://localhost:3000/loginUser?email='+email+'&password='+password).then((res)=>{
            if(res.data.data[0] == undefined){
                alert("Please Enter Valid Email or Password");
            }
            else{
                alert("Hello "+res.data.data[0].name+" you are successfully logged in.");
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                dispatch({type: "LOGIN_TRUE"});
                if(res.data.data[0].iam == "buyer"){
                    dispatch({type: "BUYER"});
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

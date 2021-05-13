import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios'

export class Register extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            name:'',
            email:'',
            password:'',
            repassword:'',
            number:'',
            iam:'',
            passwordRegex : /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
            emailRegex : /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
        }
    }

    getDataFromLoginForm(e)
    {
        this.setState({[e.target.name]:e.target.value});
    }
    
    register()
    {    
        if(this.state.name == "" || this.state.name == null || this.state.name.length == 0){
            document.getElementById('name').style.border = "3px solid red";
            alert('Name cannot be Empty');
        }
       else if(!this.state.passwordRegex.test(this.state.password)){
            document.getElementById('password').style.border = "3px solid red";
            alert('Password must contain 1 lower case, 1 upper case, 1 digit, 1 special character, length atleast 8');
        }
            else if(this.state.repassword == "" || this.state.password != this.state.repassword){
                document.getElementById('repassword').style.border = "3px solid red";
                alert('Password did not match');
            }
                else if(!this.state.emailRegex.test(this.state.email) || this.state.email == ""){
                    document.getElementById('email').style.border = "3px solid red";
                    alert('Enter valid email address');
                }
                     else if(this.state.number.length<10 || this.state.number.length>10 || this.state.number == "" || this.state.number == null){
                            document.getElementById('number').style.border = "3px solid red";
                            alert('Enter valid mobile number');
                        }
                          else if(this.state.buyer == ""){
                                alert('Choose one either buyer, owner or broker')
                          }
                            else{
                                var user = {
                                    name:this.state.name,
                                    email:this.state.email,
                                    password:this.state.password,
                                    number:this.state.number,
                                    iam:this.state.iam
                                }
                                axios.get('http://localhost:3000/checkUser?email='+user.email).then((res)=>{
                                    if( res.data.data[0] != undefined){
                                        alert("User with same Email is already exist");
                                    }
                                    else{
                                        axios.post('http://localhost:3000/registerUser', user).then((res)=>{
                                            alert(res.data.data);
                                            document.getElementById('name').value = '';
                                            document.getElementById('email').value = '';
                                            document.getElementById('password').value = '';
                                            document.getElementById('repassword').value = '';
                                            document.getElementById('number').value = '';
                                            this.props.history.push('/Login');
                                         });
                                    }
                                });

                            }
    }

    render() {
        return (
            <div class='register-container'>
                <div class='register-wrapper'>
                    <h1>Register</h1>
                    <form id='registerForm'>
                        <div className='radio-div'>
                            <select name='iam' onChange={(e)=>{this.getDataFromLoginForm(e);}}>
                                <option value=''>I AM:</option>
                                <option value='buyer'>Buyer</option>
                                <option value='owner'>Owner</option>
                                <option value='broker'>Broker</option>
                            </select>
                        </div>
                        <input id='name' placeholder='Enter Name' name='name' value={this.state.name} onChange={(e)=>{this.getDataFromLoginForm(e);}}></input>
                        <input id='email' placeholder='Enter Email' name='email' value={this.state.email} onChange={(e)=>{this.getDataFromLoginForm(e);}}></input>
                        <input type='password' id='password' placeholder='Enter Password' name='password' value={this.state.password} onChange={(e)=>{this.getDataFromLoginForm(e);}}></input>
                        <input type='password' id='repassword' placeholder='Re-Enter Password' name='repassword' value={this.state.repassword} onChange={(e)=>{this.getDataFromLoginForm(e);}}></input>
                        <input id='number' placeholder='Enter Mobile Number'name='number' value={this.state.number} onChange={(e)=>{this.getDataFromLoginForm(e);}}></input>
                        <button type='reset' onClick={()=>{this.register();}}>REGISTER</button>
                    </form>
                    <hr/><span>or register using</span>
                    <div class='register-option'>
                        <div class='facebook'>
                            <img src='/images/facebook.png'></img>
                            <span>Facebook</span>
                        </div>
                        <div class='google'>
                            <img src='images/google+.png'></img>
                            <span>Google+</span>
                        </div>
                    </div>
                    <NavLink exact to='/Login'><p>Already have an account?<span>Login Now</span></p></NavLink>
                </div>
            </div>
        )
    }
}

export default Register

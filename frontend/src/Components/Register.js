import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

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
            buyer:false,
            owner:false,
            broker:false,
            isValid:true,
            passwordRegex : /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
            emailRegex : /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
        }
    }

    getDataFromLoginForm(e)
    {
        this.setState({[e.target.name]:e.target.value});
    }
    getDataFromRadio(e)
    {
        this.setState({[e.target.id]:e.target.checked});
    }
    printData()
    {
        alert(this.state.buyer + '---' + this.state.owner + '---' + this.state.broker);
    }

    validate()
    {
        if(this.state.name == "" || this.state.name == null || this.state.name.length == 0){
            this.state.isValid = false;
            document.getElementById('name').style.border = "3px solid red";
            alert('Name cannot be Empty');
        }
        if(!this.state.passwordRegex.test(this.state.password)){
            this.state.isValid = false;
            document.getElementById('password').style.border = "3px solid red";
            alert('Password must contain 1 lower case, 1 upper case, 1 digit, 1 special character, length atleast 8');
        }
        if(this.state.repassword == "" || this.state.password != this.state.repassword){
            this.state.isValid = false;
            document.getElementById('repassword').style.border = "3px solid red";
            alert('Password did not match');
        }
        if(!this.state.emailRegex.test(this.state.email) || this.state.email == ""){
            this.state.isValid = false;
            document.getElementById('email').style.border = "3px solid red";
            alert('Enter valid email address');
        }
        if(this.state.number.length<10 || this.state.number.length>10 || this.state.number == "" || this.state.number == null){
            this.state.isValid = false;
            document.getElementById('number').style.border = "3px solid red";
            alert('Enter valid mobile number');
        }
        return this.state.isValid;
    }

    render() {
        return (
            <div class='register-container'>
                <div class='register-wrapper'>
                    <h1>Register</h1>
                    <form onSubmit={()=>{return this.validate();}}>
                        <div className='radio-div'>
                            <input type='radio' name='iam' id='buyer' value={this.state.buyer} onChange={(e)=>{this.getDataFromRadio(e);}}></input>
                            <label>Buyer</label>
                            <input type='radio' name='iam' id='owner' value={this.state.owner} onChange={(e)=>{this.getDataFromRadio(e);}}></input>
                            <label>Owner</label>
                            <input type='radio' name='iam' id='broker' value={this.state.broker} onChange={(e)=>{this.getDataFromRadio(e);}}></input>
                            <label>Broker</label>
                        </div>
                        <input id='name' placeholder='Enter Name' name='name' value={this.state.name} onChange={(e)=>{this.getDataFromLoginForm(e);}}></input>
                        <input id='email' placeholder='Enter Email' name='email' value={this.state.email} onChange={(e)=>{this.getDataFromLoginForm(e);}}></input>
                        <input id='password' placeholder='Enter Password' name='password' value={this.state.password} onChange={(e)=>{this.getDataFromLoginForm(e);}}></input>
                        <input id='repassword' placeholder='Re-Enter Password' name='repassword' value={this.state.repassword} onChange={(e)=>{this.getDataFromLoginForm(e);}}></input>
                        <input id='number' placeholder='Enter Mobile Number'name='number' value={this.state.number} onChange={(e)=>{this.getDataFromLoginForm(e);}}></input>
                        <button>REGISTER</button>
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

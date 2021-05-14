import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {

    const id = useSelector(state => state.UserData);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("");
    const [number, setNumber] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/getUser?id='+id).then((res)=>{
            setName(res.data.data[0].name);
            setEmail(res.data.data[0].email);
            setType(res.data.data[0].iam);
            setNumber(res.data.data[0].number);
        });
    }, [])

    function edit(){
        document.getElementById('name').removeAttribute("disabled");
    }

    return (
        <div class="profile-container">
                <img class='user-pic' src="images/author-3.jpg"></img>
                <div class='pic-btn'>
                    <button class='update-btn'>Update</button>
                    <button class='remove-btn'>Remove</button>
                </div>
                <div class='user-name'>
                    <input id='name' type='text' value={name} disabled></input>
                    <button onClick={()=>{edit()}}>EDIT</button>
                </div>
                <div class='user-email'>
                    <input id='email' type='text' value={email} disabled></input>
                    <button onClick={()=>{edit()}}>EDIT</button>
                </div>
                <div class='user-type'>
                    <input id='type' type='text' value={type} disabled></input>
                </div>
                <div class='user-number'>
                    <input id='number' type='text' value={number} disabled></input>
                    <button onClick={()=>{edit()}}>EDIT</button>
                </div>
                <button className='btn'>Delete Account</button>
            </div>
    )
}

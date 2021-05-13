import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {

    const id = useSelector(state => state.UserData);
    const [name, setName] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/getUser?id='+id).then((res)=>{
            setName(res.data.data[0].name);
        });
    }, [])

    function editName(){
        document.getElementById('name').removeAttribute("disabled");
    }

    return (
        <div class="profile-container">
                <img class='user-pic' src="images/author-3.jpg"></img>
                <div class='pic-btn'>
                    <button class='update-btn'>Update</button>
                    <button class='remove-btn'>Remove</button>
                </div>
                <div class='user-details'>
                    <input id='name' type='text' value={name} disabled></input>
                    <button onClick={()=>{editName()}}>EDIT</button>
                </div>
                <div class='change-div'>
                    <button>Change Password</button>
                    <button>Change Number</button>
                    <button>Change Email</button>
                </div>
            </div>
    )
}

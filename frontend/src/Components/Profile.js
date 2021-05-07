import React, { Component } from 'react'

export class Profile extends Component {

    constructor(props){
        super(props);
    }

    editName(){
        document.getElementById('name').removeAttribute("disabled");
    }

    render() {
        return (
            <div class="profile-container">
                <img class='user-pic' src="images/author-3.jpg"></img>
                <div class='pic-btn'>
                    <button class='update-btn'>Update</button>
                    <button class='remove-btn'>Remove</button>
                </div>
                <div class='user-details'>
                    <input id='name' type='text' value='William Hunter' disabled></input>
                    <button onClick={()=>{this.editName()}}>EDIT</button>
                </div>
                <div class='change-div'>
                    <button>Change Password</button>
                    <button>Change Number</button>
                    <button>Change Email</button>
                </div>
            </div>
        )
    }
}

export default Profile

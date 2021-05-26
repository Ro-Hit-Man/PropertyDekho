import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './Profile.css'
import {baseUrl} from '../config';

export default function Profile(props) {

    const id = useSelector(state => state.UserData);

    var profile;

    const [property, setProperty] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [number, setNumber] = useState("");
    const [pic, setPic] = useState("");

    useEffect(() => {
        var id = localStorage.getItem("LOGIN_ID");
        console.log(id);
        axios.post(baseUrl+'getUser?id='+id).then((res)=>{
            setName(res.data.data[0].name);
            setType(res.data.data[0].iam);
            setNumber(res.data.data[0].number);
            setPic(res.data.data[0].dp);
        });
        axios.post(baseUrl+'listProperty').then((res)=>{
            setProperty(res.data.data);
        });
    }, [])

    function edit(id){
        document.getElementById(id).removeAttribute("disabled");
        document.getElementById(id).removeAttribute("disabled");

    }

    function setValue(e){
        e.target.name == "profile" && (profile = e.target.files[0]);
    }

    function upload(){

        if(profile == undefined || profile == ""){
            alert("First choose a pic");
        }
        else{
            var formData = new FormData();
            formData.append("profile",profile);
            formData.append("id",id);

            axios.post(baseUrl+"uploadDP", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res)=>{
                    alert(res.data.data);
                    window.location.reload(true);
                }).catch(res=>{
                    alert("sorry you are not authorised to do this action");
                });
        }
    }

    function remove(){
        var data = {
            id : id,
            dp : pic
        }
        axios.post(baseUrl+"removeDP", data).then((res)=>{
            alert(res.data.data);
            window.location.reload(true);
        });
    }

    function update(uid){
        if(uid == "name"){
            var data = {
                id:id,
                name:name,
            }
            axios.post(baseUrl+"updateName", data).then((res)=>{
                alert(res.data.data);
                window.location.reload(true);
            });
        }
        if(uid == "number"){
            var data = {
                id:id,
                number:number,
            }
            axios.post(baseUrl+"updateNumber", data).then((res)=>{
            alert(res.data.data);
            window.location.reload(true);
            });
        }
    }

    function showDetails(id){
        props.history.push("/Details/"+id);
    }

    var listProperty = property.map((p)=>{
        if(p.PropertyDetails.userId == id){
            return <div className="item" key={p._id}>
                        <img id='img' src={baseUrl+p.PropertyImages[0]} alt=""/>
                        <span>{p.PropertyDetails.location}</span>
                        <h4>{p.PropertyDetails.propertyTitle}</h4>
                        <div>
                            <img src='images/home.png'></img>
                            <span>{p.PropertyDetails.areaSize} sq. ft.</span>
                        </div>
                        <button onClick={()=>{showDetails(p._id)}}>VIEW DETAILS</button>
                    </div>
        }
    });

    return (
        <div className="profile-container">
            <div className="profile-div">
                {pic == "" || pic == undefined?<img class='user-pic' src="images/profile.png"></img>:<img class='user-pic' src={baseUrl+pic}></img>}
                <div class='pic-btn'>
                    <form>
                    <input name='profile' type='file' onChange={(e)=>{setValue(e);}}></input>
                    <div>
                       {pic == "" || pic == undefined?<button type='button' onClick={()=>{upload();}} className='update-btn'>Update</button> :  <button type='button' onClick={()=>{remove();}} className='remove-btn'>Remove</button>}
                    </div>
                    </form>
                </div>
                <div class='user-name'>
                    <input id='name' type='text' value={name} disabled onChange={(e)=>{setName(e.target.value)}}></input>
                    <img onClick={()=>{edit("name")}} src='images/edit.png'></img>
                    <img onClick={()=>{update("name")}} src='images/ok.png'></img>
                </div>
                <div class='user-number'>
                    <input id='number' type='text' value={number} disabled onChange={(e)=>{setNumber(e.target.value)}}></input>
                    <img onClick={()=>{edit("number")}} src='images/edit.png'></img>
                    <img onClick={()=>{update("number")}} src='images/ok.png'></img>
                </div>
                <img id='buyer' src={'images/'+type+'.png'}></img>
                <h5 id='h5'>You Have {type} Profile</h5>
                <h6 id='h6'>(You {type == "buyer"?"Cannot":"Can"} Upload Property <br/> With {type} Profile)</h6>
            </div>
            {type == "buyer"?"":<div class="uploaded-property">
                    <h1>Your Uploaded Properties</h1>
                    <div class="uploaded-property-wrapper">
                            {listProperty}
                    </div>
            </div>}
        </div>
    )
}

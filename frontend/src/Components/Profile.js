import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import '../Styles/Profile.css'
import {baseUrl} from '../config';
import Footer from '../Partials/Footer';

export default function Profile(props) {

    const id = useSelector(state => state.UserData);
    const isAdmin = useSelector(state => state.isAdmin);

    var profile;

    const [property, setProperty] = useState([]);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [pic, setPic] = useState("");
    const [email, setemail] = useState("");

    useEffect(() => {
        var id = localStorage.getItem("LOGIN_ID");
        console.log(id);
        axios.post(baseUrl+'getUser',{id}).then((res)=>{
            setName(res.data.data[0].name);
            setemail(res.data.data[0].email);
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

    function deleteProperty(id){
        if (window.confirm("Are You Sure You Want To Delete This Property")) {
            axios.post(baseUrl+'deleteProperty', {id:id}).then((res)=>{
                alert(res.data.data);
                window.location.reload(true);
            });
        }
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

    var listProperty2 = property.map((p)=>{
            return <li key={p._Id}>
            <div class='listing-wrapper1'>
                <div class='listing-img-div1'>
                    <img src={baseUrl+p.PropertyImages[0]}></img>
                </div>
                <div class='listing-details-div1'>
                    <div class='listing-location-div1'>
                        <img src='images/location.png'></img>
                        <span>{p.PropertyDetails.location} , {p.PropertyDetails.landmark} , {p.PropertyDetails.city} , {p.PropertyDetails.state} -- {p.PropertyDetails.zipcode}</span>
                    </div>
                    <h2>{p.propertyTitle}</h2>
                    <div class='listing-area-div1'>
                        <img src='images/home.png'></img>
                        <span><strong>{p.PropertyDetails.areaSize}</strong> Sq. Ft.</span>
                    </div>
                    <div class='listing-features-div1'>
                    <div>
                            <img src='images/i-bed.png'></img>
                            <span><strong>{p.PropertyDetails.bedrooms}</strong></span>
                    </div>
                    </div>
                    <button onClick={()=>{showDetails(p._id)}}>VIEW DETAIL</button>
                    <button onClick={()=>{deleteProperty(p._id)}}>DELETE PROPERTY</button>
                </div>
                <div style={{marginLeft:'10px'}}>
                    <span>Property Posted By</span>
                    <h4>{name}</h4>
                    <h5>{email}</h5>
                </div>
                <div class='listing-category1'>FOR {p.PropertyDetails.propertyCatagory}</div>
                <div class='listing-type1'>{p.PropertyDetails.propertyType}</div>
                <div class='listing-price1'>{p.PropertyDetails.price}</div>
            </div>
        </li>
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
            </div>
            {isAdmin?
            <div>
                <h1 style={{color:'white',textAlign:'center',marginTop:'50px',fontWeight:'500',fontSize:'40px'}}>List Of Properties</h1>
                    <div style={{background:'transparent'}} className='listing-container'>
                            <ul>
                            {listProperty2}
                            </ul>
                    </div>
            </div>
            :
            <div class="uploaded-property">
                    <h1>Your Uploaded Properties</h1>
                    <div class="uploaded-property-wrapper">
                            {listProperty}
                    </div>
            </div>}

            <Footer/>

        </div>
    )
}

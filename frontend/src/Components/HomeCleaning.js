import React, { useEffect, useState } from 'react'
import Footer from '../Partials/Footer'
import PropertyService from '../Partials/PropertyService'
import '../Styles/HomeCleaning.css'
import {useDispatch, useSelector} from 'react-redux'
import {baseUrl} from '../config';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import {NavLink} from 'react-router-dom';

var catagory;
var service;

export default function HomeCleaning() {

    const [list, setlist] = useState([]);

    useEffect(() => {
        axios.post(baseUrl+'listService').then((res)=>{
             setlist(res.data.data);
        });
        catagory = localStorage.getItem("CATAGORY");
     }, []);

    const isAdmin = useSelector(state => state.isAdmin);

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [name,setname] = useState("");

    function setImg(e){
        e.target.name == "service" && (service = e.target.files[0]);
    }

    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow(false);

    function addService(){
        setShow(false);
        if(name == ""){
            alert("name cannot be empty");
        }
        else if(service == undefined){
            alert("choose an image");
        }
        else{
            var formData = new FormData();
            formData.append('name', name);
            formData.append('catagory',catagory);
            formData.append('service',service);

            axios.post(baseUrl+"postService", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                alert(res.data.data);
                window.location.reload(true);
            }).catch(res=>{
                alert("Please Upload image in only (png, jpg, jpeg, webp, jfif) format");
            });
        }
    }

    function packages(name){
        localStorage.setItem("SERVICE" , name);
    }

    var serviceList = list.map((s)=>{
        if(s.catagory === "Home Cleaning"){
            return <div key={s._id} className='home-cleaning-services-item'>
                        <img src={baseUrl+s.image}></img>
                        <h4>{s.name}</h4>
                        <NavLink to='/PackageListing' exact><button onMouseOver={()=>{packages(s.name);}}>View Packages</button></NavLink>
                    </div>
            }
    });

    return (
        <div className='home-cleaning-container'>
            <div className='home-cleaning-banner'>
                <img src='images/home_cleaning.jpg'></img>
                <h1>Home Cleaning</h1>
            </div>
            <div className='home-cleaning-services-wrapper'>
                <div className='add-new-service'>
                    <h3>Services We Offer</h3>
                    {isAdmin?<button onClick={handleShow}>Add New Service</button>:""}
                </div>
                <p>Choose the service that best suits you</p>
                <div className='home-cleaning-services'>
                    {serviceList}
                </div>
            </div>
            <PropertyService />
            <Modal show={show} onHide={handleClose1}>
            <Modal.Header closeButton>
            <Modal.Title>Post New Service</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <form>
                        <input required type='text' placeholder="Enter name of Service" value={name} onChange={(e)=>{setname(e.target.value)}}></input>
                        <input name='service' type='file' onChange={(e)=>{setImg(e);}}></input>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={addService}>
                    Post Service
                </Button>
                </Modal.Footer>
            </Modal>
            <Footer />
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import {baseUrl} from '../config';
import axios from 'axios';
import '../Styles/PackageListing.css'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSelector } from 'react-redux';

var service;
export default function PackageListing() {

    const [packages, setpackage] = useState([]);
    const isAdmin = useSelector(state => state.isAdmin);


    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [name,setname] = useState("");
    const [price, setprice] = useState("");
    const [time, settime] = useState("");
    const [d1, setd1] = useState("");
    const [d2, setd2] = useState("");
    const [d3, setd3] = useState("");
    const [d4, setd4] = useState("");
    const [d5, setd5] = useState("");
    const [username, setusername] = useState("");
    const [useremail, setuseremail] = useState("");
    const [usernumber, setusernumber] = useState("");
    const [packageName, setpackageName] = useState("");

    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);

    useEffect(() => {
        service = localStorage.getItem("SERVICE");
        axios.post(baseUrl+'listPackage').then((res)=>{
            setpackage(res.data.data);
        });
    }, []);

    function addPackage(){
        setShow(false);
        if(name == ""){
            alert("Name cannot be empty");
        }
        else if(price == ""){
            alert("Price cannot be empty");
        }
        else if(time == ""){
            alert("Time cannot be empty");
        }
        else{
            var data = {
                name : name,
                price : price,
                time : time,
                d1 : d1,
                d2 : d2,
                d3 : d3,
                d4 : d4,
                d5 : d5,
                service : service
            }
            axios.post( baseUrl+'postPackage',data).then((res)=>{
                alert(res.data.data);
                window.location.reload(true);
            });
        }
    }

    function showInterest(){
        setShow(false);
        var data = {
            username : username,
            useremail : useremail,
            usernumber : usernumber,
            package : packageName,
        }
        axios.post( baseUrl+'interested',data).then((res)=>{
            alert(res.data.data);
            window.location.reload(true);
        });
    }

    var packageList = packages.map((p)=>{
        if(p.service == service){
            return <div className='package-item'>
                        <div>
                            <h3>{p.name}</h3>
                            <h3 style={{color:'green'}}>&#8377; {p.price}</h3>
                            <h5><span>Time : </span>{p.time} mins</h5>
                        </div>
                        <div>
                            <ul>
                                <li>{p.d1}</li>
                                <li>{p.d2}</li>
                                <li>{p.d3}</li>
                                <li>{p.d4}</li>
                                <li>{p.d5}</li>
                            </ul>
                        </div>
                        <div>
                            <button onMouseOver={()=>{setpackageName(p.name);}} onClick={handleShow1}>SHOW INTEREST</button>
                        </div>
                    </div>
        }
    });

    return (
        <div className='package-container'>
            <div className='package-container-header'>
                <h1>{service}</h1>
                {isAdmin?<button onClick={handleShow}>Add New Package</button>:""}
            </div>
            <div className='package-wrapper'>
                {packageList}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Post New Package</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <form>
                            <input type='text' placeholder='Enter Name of package' value={name} onChange={(e)=>{setname(e.target.value);}}></input>
                            <input type='number' placeholder='Enter Price' value={price} onChange={(e)=>{setprice(e.target.value);}}></input>
                            <input type='number' placeholder='Enter Time in Minutes' value={time} onChange={(e)=>{settime(e.target.value);}}></input>
                            <input type='text' placeholder="Enter Details of Package (OPTIONAL)" value={d1} onChange={(e)=>{setd1(e.target.value);}}></input>
                            <input type='text' placeholder="Enter Details of Package (OPTIONAL)" value={d2} onChange={(e)=>{setd2(e.target.value);}}></input>
                            <input type='text' placeholder="Enter Details of Package (OPTIONAL)" value={d3} onChange={(e)=>{setd3(e.target.value);}}></input>
                            <input type='text' placeholder="Enter Details of Package (OPTIONAL)" value={d4} onChange={(e)=>{setd4(e.target.value);}}></input>
                            <input type='text' placeholder="Enter Details of Package (OPTIONAL)" value={d5} onChange={(e)=>{setd5(e.target.value);}}></input>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={addPackage}>
                        Post Package
                    </Button>
                    </Modal.Footer>
            </Modal>
            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Show Your Interest</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <form>
                            <input required type='text' placeholder='Enter your Name' value={username} onChange={(e)=>{setusername(e.target.value);}}></input>
                            <input required type='number' placeholder='Enter your Number' value={usernumber} onChange={(e)=>{setusernumber(e.target.value);}}></input>
                            <input required type='email' placeholder="Enter your email" value={useremail} onChange={(e)=>{setuseremail(e.target.value);}}></input>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={showInterest}>
                        Show Interest
                    </Button>
                    </Modal.Footer>
            </Modal>
        </div>
    )
}

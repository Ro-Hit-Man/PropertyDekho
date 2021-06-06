
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../Styles/Listing.css'
import {baseUrl} from '../config';
import { useSelector } from 'react-redux';
import Footer from '../Partials/Footer';

function Listing(props) {


    const [filtered, setfiltered] = useState([]);
    const [property, setproperty] = useState([]);
    const [type, settype] = useState("");
    const [catagory, setcatagory] = useState("");
    const [bhk, setbhk] = useState("");

    const data = useSelector(state => state.searchData);

    useEffect(() => {
        axios.post(baseUrl+'listProperty').then((res)=>{
            setproperty(res.data.data);
            setfiltered(res.data.data);
        });
    }, []);

    function showDetails(id){
        props.history.push("/Details/"+id);
    }

    function setValue(e){
        let type2 = type;
        let catagory2 = catagory;
        let bhk2 = bhk;
        e.target.name == "type" && (type2=e.target.value);
        e.target.name == "catagory" && (catagory2=e.target.value);
        e.target.name == "bhk" && (bhk2=e.target.value);
        e.target.name == "type" && (settype(e.target.value));
        e.target.name == "catagory" && (setcatagory(e.target.value));
        e.target.name == "bhk" && (setbhk(e.target.value));

        let temp = [...property];

        if(type2 !=""){ 
           temp = temp.filter((f)=>{
                return f.PropertyDetails.propertyType == type2;
            }); 
        }
        
        if(catagory2 != ""){
            temp = temp.filter((f)=>{
                 return f.PropertyDetails.propertyCatagory == catagory2;
             }); 
         }

         if(bhk2 != ""){
            temp = temp.filter((f)=>{
                 return f.PropertyDetails.bedrooms == bhk2;
             }); 
         }

         setfiltered(temp);
    }

    var propertyList = filtered.map((p)=>{

        if(p.PropertyDetails.city == data){
                return (
                    <li key={p._Id}>
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
                                <div>
                                        <img src='images/i-bath.png'></img>
                                        <span><strong>{p.PropertyDetails.bathrooms}</strong></span>
                                </div>
                                <div>
                                        <img src='images/i-car.png'></img>
                                        <span><strong>{p.PropertyDetails.garage}</strong></span>
                                </div>
                                <div>
                                        <img src='images/i-pool.png'></img>
                                        <span><strong>{p.PropertyDetails.pool}</strong></span>
                                </div>
                                </div>
                                <button onClick={()=>{showDetails(p._id)}}>VIEW DETAIL</button>
                            </div>
                            <div class='listing-category1'>FOR {p.PropertyDetails.propertyCatagory}</div>
                            <div class='listing-type1'>{p.PropertyDetails.propertyType}</div>
                            <div class='listing-price1'>{p.PropertyDetails.price}</div>
                        </div>
                    </li>
                )
        }
    });

    return (
        <div class='listing-container'>
            <div className='filter-div'>
                <select name='type' onChange={(e)=>{setValue(e)}}>
                    <option value="">Select Type</option>
                    <option value="HOUSE">House</option>
                    <option value="VILLA">Villa</option>
                    <option value="APARTMENT">Apartment</option>
                </select>
                <select name='catagory' onChange={(e)=>{setValue(e)}}>
                    <option value="">Select Catagory</option>
                    <option value="SELL">Sell</option>
                    <option value="RENT">Rent</option>
                </select>
                <select name='bhk' onChange={(e)=>{setValue(e)}}>
                    <option value="">Select BHK</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5 BHK</option>
                </select>
            </div>
            <ul>
                {propertyList}
            </ul>
            <Footer/>
        </div>
    )
}

export default Listing


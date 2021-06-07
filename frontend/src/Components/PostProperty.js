import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'
import {baseUrl} from '../config';
import '../Styles/PostProperty.css'
import Footer from '../Partials/Footer';

export default function PostProperty() {

    var property;

    const userId = useSelector(state => state.UserData);

    const [propertyTitle, setpropertyTitle] = useState("");
    const [propertyType, setpropertyType] = useState("");
    const [propertyCatagory, setpropertyCatagory] = useState("");
    const [price, setprice] = useState("");
    const [location, setlocation] = useState("");
    const [landmark, setlandmark] = useState("");
    const [city, setcity] = useState("");
    const [state, setstate] = useState("");
    const [zipcode, setzipcode] = useState("");
    const [description, setdescription] = useState("");
    const [areaSize, setareaSize] = useState("");
    const [carpetArea, setcarpetArea] = useState("");
    const [yearBuild, setyearBuild] = useState("");
    const [bedrooms, setbedrooms] = useState("");
    const [bathrooms, setbathrooms] = useState("");
    const [gym, setgym] = useState(false);
    const [basement, setbasement] = useState(false);
    const [lift, setlift] = useState(false);
    const [swimmingPool, setswimmingPool] = useState(false);
    const [parking, setparking] = useState(false);
    const [intercom, setintercom] = useState(false);
    const [laundry, setlaundry] = useState(false);
    const [security, setsecurity] = useState(false);
    const [sportsFacility, setsportsFacility] = useState(false);
    const [powerBackup, setpowerBackup] = useState(false);
    const [jogging, setjogging] = useState(false);
    const [garden, setgarden] = useState(false);
    const [ac, setac] = useState(false);
    const [refrigerator, setrefrigerator] = useState(false);
    const [gas, setgas] = useState(false);
    const [sofa, setsofa] = useState(false);
    const [tv, settv] = useState(false);
    const [microwave, setmicrowave] = useState(false);
    const [wardrobe, setwardrobe] = useState(false);
    const [bed, setbed] = useState(false);
    const [wifi, setwifi] = useState(false);
    const [dinningTable, setdinningTable] = useState(false);
    const [waterHeater, setwaterHeater] = useState(false);
    const [barbeque, setbarbeque] = useState(false);

    function setValue(e){
        e.target.name == "property" && (property = e.target.files);
    }

    function sendData()
    {
        if(propertyTitle == "" || propertyTitle == null || propertyTitle.length == 0){
            alert("Property Title Cannot be Empty");
        }
        else if(propertyType == ""){
                alert("Property Type Cannot be Empty");
        }
        else if(propertyCatagory == ""){
                alert("Property Catagory Cannot be Empty");
        }
        else if(price == ""){
                alert("Price Cannot be Empty");
        }
        else if(location == ""){
                alert("Location Cannot be Empty");
        }
        else if(landmark == ""){
                alert("Landmark Cannot be Empty");
        }
        else if(city == ""){
                alert("city Cannot be Empty");
        }
        else if(state == ""){
                alert("State Cannot be Empty");
        }
        else if(zipcode == ""){
                alert("Zipcode Cannot be Empty");
        }
        else if(description == ""){
                alert("Description Cannot be Empty");
        }
        else if(areaSize == ""){
                alert("Area Size Cannot be Empty");
        }
        else if(carpetArea == ""){
                alert("Carpet Area Cannot be Empty");
        }
        else if(yearBuild == ""){
                alert("Year Build Cannot be Empty");
        }
        else if(bedrooms == ""){
                alert("Bedrooms Cannot be Empty");
        }
        else if(bathrooms == ""){
                alert("Bathrooms Cannot be Empty");
        }
        else{
            var formData = new FormData();
            formData.append("propertyTitle",propertyTitle);
            formData.append("propertyType",propertyType);
            formData.append("propertyCatagory",propertyCatagory);
            formData.append("price",price);
            formData.append("location",location);
            formData.append("landmark",landmark);
            formData.append("city",city);
            formData.append("state",state);
            formData.append("zipcode",zipcode);
            formData.append("description",description);
            formData.append("areaSize",areaSize);
            formData.append("carpetArea",carpetArea);
            formData.append("yearBuild",yearBuild);
            formData.append("bedrooms",bedrooms);
            formData.append("bathrooms",bathrooms);
            formData.append("gym",gym);
            formData.append("basement",basement);
            formData.append("lift",lift);
            formData.append("garden",garden);
            formData.append("security",security);
            formData.append("sportsFacility",sportsFacility);
            formData.append("swimmingPool",swimmingPool);
            formData.append("parking",parking);
            formData.append("intercom",intercom);
            formData.append("laundry",laundry);
            formData.append("powerBackup",powerBackup);
            formData.append("jogging",jogging);
            formData.append("ac",ac);
            formData.append("tv",tv);
            formData.append("sofa",sofa);
            formData.append("wifi",wifi);
            formData.append("microwave",microwave);
            formData.append("bed",bed);
            formData.append("wardrobe",wardrobe);
            formData.append("dinningTable",dinningTable);
            formData.append("waterHeater",waterHeater);
            formData.append("gas",gas);
            formData.append("refrigerator",refrigerator);
            formData.append("barbeque",barbeque);
            formData.append("userId",userId);
            for(var p of property){
                formData.append('property',p);
            }

            axios.post(baseUrl+"postProperty", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                alert(res.data.data);
            }).catch(res=>{
                alert("Please Upload image in only (png, jpg, jpeg, webp, jfif) format");
            });
        }
    }

    return (
        <div className="Post-container">
                <div className="Post-header">
                    <h1>Submit New Property</h1>
                </div>
                <form>
                    <div className='gen-desc-div-wrapper'>
                    <div className="Post-general">
                        <h1>General Property Info</h1>
                        
                            <label>Property Title</label><br/>
                            <input placeholder='Title Here' name='propertyTitle' value={propertyTitle} onChange={(e)=>{setpropertyTitle(e.target.value)}}></input><br/>
                            <div className='Post-wrapper'>
                                <div className='Post-type'>
                                    <label>Type</label>
                                    <select name='propertyType' value={propertyType} onChange={(e)=>{setpropertyType(e.target.value)}}>
                                        <option value="">Select Type</option>
                                        <option value="HOUSE">House</option>
                                        <option value="VILLA">Villa</option>
                                        <option value="APARTMENT">Apartment</option>
                                    </select>
                                </div>
                                <div className='Post-catagory'>
                                    <label>Catagory</label>
                                    <select name='propertyCatagory' value={propertyCatagory} onChange={(e)=>{setpropertyCatagory(e.target.value)}}>
                                        <option value="">Select Catagory</option>
                                        <option value="SELL">Sell</option>
                                        <option value="RENT">Rent</option>
                                    </select>
                                </div>
                                <div className='Post-price'>
                                    <label>Price</label>
                                    <input placeholder='Price' name='price' value={price} onChange={(e)=>{setprice(e.target.value)}}></input>
                                </div>
                            </div>
                            <div className='Post-wrapper'>
                                <div  className='Post-location'>
                                    <label>Location</label>
                                    <input placeholder='272 Alpha Rock Suit CA' name='location' value={location} onChange={(e)=>{setlocation(e.target.value)}}></input>
                                    <div className='post-city-div'>
                                        <input placeholder='Landmark' name='landmark' value={landmark} onChange={(e)=>{setlandmark(e.target.value)}}></input>
                                        <input id='city' placeholder='City' name='city' value={city} onChange={(e)=>{setcity(e.target.value)}}></input>
                                    </div>
                                    <div className='post-state-div'>
                                        <input placeholder='State' name='state' value={state} onChange={(e)=>{setstate(e.target.value)}}></input>
                                        <input id='zip' placeholder='Zip Code' name='zipcode' value={zipcode} onChange={(e)=>{setzipcode(e.target.value)}}></input>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    
                        <div className='post-description'>
                            <h1>Description</h1>
                            <textarea placeholder='Description' name='description' value={description} onChange={(e)=>{setdescription(e.target.value)}}></textarea>
                            <h1>Details</h1>
                                <div className='Post-wrapper'>
                                    <div className='Post-area'>
                                        <label>Area Size Sq.Ft (Only Digits)</label>
                                        <input placeholder='Area Size' name='areaSize' value={areaSize} onChange={(e)=>{setareaSize(e.target.value)}}></input>
                                    </div>
                                    <div className='Post-land'>
                                        <label>Carpet Area (Only Digits)</label>
                                        <input placeholder='Carpet Area' name='carpetArea' value={carpetArea} onChange={(e)=>{setcarpetArea(e.target.value)}}></input>
                                    </div>
                                </div>
                                <div className='Post-wrapper'>
                                    <div className='Post-year-build'>
                                        <label>Year Build</label>
                                        <input placeholder='Year Build' name='yearBuild' value={yearBuild} onChange={(e)=>{setyearBuild(e.target.value)}}></input>
                                    </div>
                                    <div className='Post-bedrooms'>
                                        <label>Bedrooms</label>
                                        <input type='number' name='bedrooms' value={bedrooms} onChange={(e)=>{setbedrooms(e.target.value)}}></input>
                                    </div>
                                    <div className='Post-bathrooms'>
                                        <label>Bathrooms</label>
                                        <input type='number' name='bathrooms' value={bathrooms} onChange={(e)=>{setbathrooms(e.target.value)}}></input>
                                    </div>
                                </div>
                        </div>
                    </div>
                    
                    <div className='post-other'>
                        <h1>Property Anemities</h1>
                        <div className='row1'>
                            <div className='Post-wrapper'>
                                <div className='features'> 
                                    <input type='checkbox' name='gym' id='gym' value={gym} onChange={(e)=>{setgym(e.target.checked)}}></input>
                                    <label>Gym</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='basement' id='basement' value={basement} onChange={(e)=>{setbasement(e.target.checked)}}></input>
                                    <label>Basement</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='lift' id='lift' value={lift} onChange={(e)=>{setlift(e.target.checked)}}></input>
                                    <label>Lift</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='parking' id='parking' value={parking} onChange={(e)=>{setparking(e.target.checked)}}></input>
                                    <label>Parking</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='swimmingPool' id='swimmingPool' value={swimmingPool} onChange={(e)=>{setswimmingPool(e.target.checked)}}></input>
                                    <label>Swimming-Pool</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='intercom' id='intercom' value={intercom} onChange={(e)=>{setintercom(e.target.checked)}}></input>
                                    <label>Intercom</label>
                                </div>
                            </div>
                        </div>
                        <div className='row2'>
                            <div className='Post-wrapper'>
                                <div className='features'> 
                                    <input type='checkbox' name='laundry' id='laundry' value={laundry} onChange={(e)=>{setlaundry(e.target.checked)}}></input>
                                    <label>Laundry</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='garden' id='garden' value={garden} onChange={(e)=>{setgarden(e.target.checked)}}></input>
                                    <label>Garden</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='sportsFacility' id='sportsFacility' value={sportsFacility} onChange={(e)=>{setsportsFacility(e.target.checked)}}></input>
                                    <label>Sports Facility</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='security' id='security' value={security} onChange={(e)=>{setsecurity(e.target.checked)}}></input>
                                    <label>Security</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='jogging' id='jogging' value={jogging} onChange={(e)=>{setjogging(e.target.checked)}}></input>
                                    <label>Jogging Track</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='powerBackup' id='powerBackup' value={powerBackup} onChange={(e)=>{setpowerBackup(e.target.checked)}}></input>
                                    <label>Power Backup</label>
                                </div>
                            </div>
                        </div>

                        <h1>Property Furnishings</h1>
                        <div className='row1'>
                            <div className='Post-wrapper'>
                                <div className='features'> 
                                    <input type='checkbox' name='ac' id='air-conditioning' value={ac} onChange={(e)=>{setac(e.target.checked)}}></input>
                                    <label>Air Conditioning</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='gas' id='gas' value={gas} onChange={(e)=>{setgas(e.target.checked)}}></input>
                                    <label>Gas Connection</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='refrigerator' id='refrigerator' value={refrigerator} onChange={(e)=>{setrefrigerator(e.target.checked)}}></input>
                                    <label>Refrigerator</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='tv' id='tv' value={tv} onChange={(e)=>{settv(e.target.checked)}}></input>
                                    <label>TV</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='microwave' id='microwave' value={microwave} onChange={(e)=>{setmicrowave(e.target.checked)}}></input>
                                    <label>Microwave</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='sofa' id='sofa' value={sofa} onChange={(e)=>{setsofa(e.target.checked)}}></input>
                                    <label>Sofa</label>
                                </div>
                            </div>
                        </div>
                        <div className='row2'>
                            <div className='Post-wrapper'>
                                <div className='features'> 
                                    <input type='checkbox' name='wardrobe' id='wardrobe' value={wardrobe} onChange={(e)=>{setwardrobe(e.target.checked)}}></input>
                                    <label>Wardrobe</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='bed' id='bed' value={bed} onChange={(e)=>{setbed(e.target.checked)}}></input>
                                    <label>Bed</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='dinningTable' id='dinningTable' value={dinningTable} onChange={(e)=>{setdinningTable(e.target.checked)}}></input>
                                    <label>Dinning Table</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='barbeque' id='barbeque' value={barbeque} onChange={(e)=>{setbarbeque(e.target.checked)}}></input>
                                    <label>Barbeque</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='wiFi' id='wiFi' value={wifi} onChange={(e)=>{setwifi(e.target.checked)}}></input>
                                    <label>WiFi</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='waterHeater' id='waterHeater' value={waterHeater} onChange={(e)=>{setwaterHeater(e.target.checked)}}></input>
                                    <label>Water Heater</label>
                                </div>
                            </div>
                        </div>

                        <h1>Property Images</h1>
                        <h5 className='alert'>You can Choose Only 7 Images At Max</h5>
                        <input id='file' name='property' onChange={(e)=>{setValue(e);}}  type='file' multiple></input>
                
                        <button onClick={()=>{sendData();}}>SUBMIT PROPERTY</button>
                    </div>
                </form>
            <Footer/>

            </div>
    )
}

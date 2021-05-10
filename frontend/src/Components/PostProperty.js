import React, { Component } from 'react'
import axios from 'axios'

export class PostProperty extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            propertyTitle:'',
            propertyType:'',
            propertyCatagory:'',
            price:'',
            location:'',
            description:'',
            areaSize:'',
            carpetArea:'',
            yearBuild:'',
            bedrooms:'',
            bathrooms:'',

            gas:false,
            sofa:false,
            ac:false,
            refrigerator:false,
            tv:false,
            wardrobe:false,
            barbeque:false,
            wifi:false,
            microwave:false,
            bed:false,
            dinningTable:false,
            waterHeater:false,

            gym:false,
            basement:false,
            laundry:false,
            parking:false,
            swimmingPool:false,
            intercom:false,
            powerBackup:false,
            lift:false,
            sportsFacility:false,
            jogging:false,
            security:false,
            garden:false,
        }
    }

    getDataFromForm(e)
    {
        this.setState({[e.target.name]:e.target.value});
    }
    getDataFromCheckBox(e)
    {
        this.setState({[e.target.name]:e.target.checked});
    }
    sendData()
    {
        if(this.state.propertyTitle == "" || this.state.propertyTitle == null || this.state.propertyTitle.length == 0){
            alert("Property Title Cannot be Empty");
        }
        else if(this.state.propertyType == ""){
                alert("Property Type Cannot be Empty");
             }
             else if(this.state.propertyCatagory == ""){
                    alert("Property Catagory Cannot be Empty");
                  }
                  else if(this.state.price == ""){
                          alert("Price Cannot be Empty");
                        }
                        else if(this.state.location == ""){
                                alert("Location Cannot be Empty");
                             }
                             else if(this.state.description == ""){
                                    alert("Description Cannot be Empty");
                                    }
                                   else if(this.state.areaSize == ""){
                                            alert("Area Size Cannot be Empty");
                                        }
                                        else if(this.state.landArea == ""){
                                                alert("Land Area Cannot be Empty");
                                             }
                                            else if(this.state.yearBuild == ""){
                                                    alert("Year Build Cannot be Empty");
                                                 }
                                                else if(this.state.bedrooms == ""){
                                                        alert("Bedrooms Cannot be Empty");
                                                    }
                                                    else if(this.state.bathrooms == ""){
                                                            alert("Bathrooms Cannot be Empty");
                                                          }
                                                          else{
                                                            var p = this.state;
                                                            axios.post("http://localhost:3000/postProperty", p).then((res)=>{
                                                                alert(res.data.data);
                                                            });
                                                          }
    }

    // validate()
    // {
    //     
    //     this.sendData(this.state.isValid);
    // }

    render() {
        return (
            <div className="Post-container">
                <div className="Post-header">
                    <h1>Submit New Property</h1>
                </div>
                <form>
                    <div className="Post-general">
                        <h1>General Property Info</h1>
                        
                            <label>Property Title</label><br/>
                            <input placeholder='Title Here' name='propertyTitle' value={this.state.propertyTitle} onChange={(e)=>{this.getDataFromForm(e);}}></input><br/>
                            <div className='Post-wrapper'>
                                <div className='Post-type'>
                                    <label>Type</label>
                                    <select name='propertyType' value={this.state.propertyType} onChange={(e)=>{this.getDataFromForm(e);}}>
                                        <option value="">Select Type</option>
                                        <option value="HOUSE">House</option>
                                        <option value="VILLA">Villa</option>
                                        <option value="APARTMENT">Apartment</option>
                                    </select>
                                </div>
                                <div className='Post-catagory'>
                                    <label>Catagory</label>
                                    <select name='propertyCatagory' value={this.state.propertyCatagory} onChange={(e)=>{this.getDataFromForm(e);}}>
                                        <option value="">Select Catagory</option>
                                        <option value="SELL">Sell</option>
                                        <option value="RENT">Rent</option>
                                    </select>
                                </div>
                                <div className='Post-price'>
                                    <label>Price</label>
                                    <input placeholder='Price' name='price' value={this.state.price} onChange={(e)=>{this.getDataFromForm(e);}}></input>
                                </div>
                            </div>
                            <div className='Post-wrapper'>
                                <div  className='Post-location'>
                                    <label>Location</label>
                                    <input placeholder='272 Alpha Rock Suit CA' name='location' value={this.state.location} onChange={(e)=>{this.getDataFromForm(e);}}></input>
                                </div>
                                <button>SELECT ON GOOGLE</button>
                            </div>
                        
                    
                    
                        <h1>Description</h1>
                        <textarea placeholder='Description' name='description' value={this.state.description} onChange={(e)=>{this.getDataFromForm(e);}}></textarea>
    
                    
                        <h1>Details</h1>
                            <div className='Post-wrapper'>
                                <div className='Post-area'>
                                    <label>Area Size Sq.Ft (Only Digits)</label>
                                    <input placeholder='Area Size' name='areaSize' value={this.state.areaSize} onChange={(e)=>{this.getDataFromForm(e);}}></input>
                                </div>
                                <div className='Post-land'>
                                    <label>Carpet Area (Only Digits)</label>
                                    <input placeholder='Land Area' name='landArea' value={this.state.landArea} onChange={(e)=>{this.getDataFromForm(e);}}></input>
                                </div>
                            </div>
                            <div className='Post-wrapper'>
                            <div className='Post-year-build'>
                                    <label>Year Build</label>
                                    <input placeholder='Year Build' name='yearBuild' value={this.state.yearBuild} onChange={(e)=>{this.getDataFromForm(e);}}></input>
                                </div>
                                <div className='Post-bedrooms'>
                                    <label>Bedrooms</label>
                                    <input type='number' name='bedrooms' value={this.state.bedrooms} onChange={(e)=>{this.getDataFromForm(e);}}></input>
                                </div>
                                <div className='Post-bathrooms'>
                                    <label>Bathrooms</label>
                                    <input type='number' name='bathrooms' value={this.state.bathrooms} onChange={(e)=>{this.getDataFromForm(e);}}></input>
                                </div>
                            </div>
                        
                
                        <h1>Property Anemities</h1>
                        <div className='row1'>
                            <div className='Post-wrapper'>
                                <div className='features'> 
                                    <input type='checkbox' name='gym' id='gym' value={this.state.gym} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Gym</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='basement' id='basement' value={this.state.basement} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Basement</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='lift' id='lift' value={this.state.lift} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Lift</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='parking' id='parking' value={this.state.parking} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Parking</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='swimmingPool' id='swimmingPool' value={this.state.swimmingPool} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Swimming-Pool</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='intercom' id='intercom' value={this.state.intercom} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Intercom</label>
                                </div>
                            </div>
                        </div>
                        <div className='row2'>
                            <div className='Post-wrapper'>
                                <div className='features'> 
                                    <input type='checkbox' name='laundry' id='laundry' value={this.state.laundry} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Laundry</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='garden' id='garden' value={this.state.garden} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Garden</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='sportsFacility' id='sportsFacility' value={this.state.sportsFacility} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Sports Facility</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='security' id='security' value={this.state.security} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Security</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='jogging' id='jogging' value={this.state.jogging} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Jogging Track</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='powerBackup' id='powerBackup' value={this.state.powerBackup} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Power Backup</label>
                                </div>
                            </div>
                        </div>

                        <h1>Property Furnishings</h1>
                        <div className='row1'>
                            <div className='Post-wrapper'>
                                <div className='features'> 
                                    <input type='checkbox' name='ac' id='air-conditioning' value={this.state.ac} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Air Conditioning</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='gas' id='gas' value={this.state.gas} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Gas Connection</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='refrigerator' id='refrigerator' value={this.state.refrigerator} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Refrigerator</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='tv' id='tv' value={this.state.tv} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>TV</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='microwave' id='microwave' value={this.state.microwave} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Microwave</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='sofa' id='sofa' value={this.state.sofa} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Sofa</label>
                                </div>
                            </div>
                        </div>
                        <div className='row2'>
                            <div className='Post-wrapper'>
                                <div className='features'> 
                                    <input type='checkbox' name='wardrobe' id='wardrobe' value={this.state.wardrobe} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Wardrobe</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='bed' id='bed' value={this.state.bed} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Bed</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='dinningTable' id='dinningTable' value={this.state.dinningTable} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Dinning Table</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='barbeque' id='barbeque' value={this.state.barbeque} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Barbeque</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='wiFi' id='wiFi' value={this.state.wifi} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>WiFi</label>
                                </div>
                                <div className='features'> 
                                    <input type='checkbox' name='waterHeater' id='waterHeater' value={this.state.waterHeater} onChange={(e)=>{this.getDataFromCheckBox(e);}}></input>
                                    <label>Water Heater</label>
                                </div>
                            </div>
                        </div>

                        <h1>Property Images</h1>
                        <input id='file' type='file' multiple></input>
                
                        <button onClick={()=>{this.sendData();}}>SUBMIT PROPERTY</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default PostProperty

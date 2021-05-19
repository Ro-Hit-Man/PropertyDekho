var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var path = require('path');
var upload = require('./multerConfig');
var fs = require('fs');

var app = express();
app.use(cors());

app.use(express.static(path.join(__dirname,'userUploads')));

var client = new MongoClient('mongodb+srv://myhome:myhome@cluster0.zj3m5.mongodb.net/myhome?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true});
var connection;
client.connect((err, db)=>{
    if(!err){
        connection = db;
        console.log("Database Connected Successfully");
    }
    else{
        console.log(err);
    }
});

app.post('/postProperty', bodyParser.json(),(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log("Error Occured during upload ");
            console.log(err);
            res.send({status:"failed", data:err});
        }
        else{
            var propertyCollection = connection.db('myhome').collection('property');
            var images = req.files.property.map(p=>p.filename);
            propertyCollection.insert({PropertyDetails:req.body,PropertyImages:images},(err,result)=>{
                if(!err){
                    res.send({status:"ok",data:"Property Posted Succesfully"});
                }
                else{
                    res.send({status:"failed",data:err});
                }
            });
        }
    });
});

app.get('/listProperty',(req,res)=>{
    var propertyCollection = connection.db('myhome').collection('property');
    propertyCollection.find({}).toArray((err,docs)=>{
        if(!err){
            res.send({status:"ok",data:docs});
        }
        else{
            res.send({status:"failed",data:err});
        }
    });
});

app.get('/detailProperty',(req,res)=>{
    var propertyCollection = connection.db('myhome').collection('property');
    propertyCollection.find({_id:ObjectID(req.query.id)}).toArray((err,docs)=>{
        if(!err){
            res.send({status:"ok",data:docs});
        }
        else{
            res.send({status:"failed",data:err});
        }
    });
});

app.get('/searchProperty',(req,res)=>{
    var propertyCollection = connection.db('myhome').collection('property');
    propertyCollection.find({city:"",budget:""}).toArray((err,docs)=>{
        if(!err){
            res.send({status:"ok",data:docs});
        }
        else{
            res.send({status:"failed",data:err});
        }
    });
});

app.post('/registerUser', bodyParser.json(), (req,res)=>{
    var userCollection = connection.db('myhome').collection('user');
    userCollection.insert(req.body , (err,result)=>{
        if(!err){
            res.send({status:"ok",data:"User Registered Succesfully"});
        }
        else{
            res.send({status:"failed",data:err});
        }
    });
});

app.get('/getUser', (req,res)=>{
    var userCollection = connection.db('myhome').collection('user');
    userCollection.find({_id:ObjectID(req.query.id)}).toArray((err,docs)=>{
        if(!err){
            res.send({status:"ok",data:docs});
        }
        else{
            res.send({status:"failed",data:err});
        }
    });
});

app.get('/checkUser', (req,res)=>{
    var userCollection = connection.db('myhome').collection('user');
    userCollection.find({email: req.query.email}).toArray((err,docs)=>{
        if(!err){
            res.send({status:"ok",data:docs});
        }
        else{
            res.send({status:"failed",data:err});
        }
    })
});

app.get('/loginUser', (req,res)=>{
    var userCollection = connection.db('myhome').collection('user');
    userCollection.find({email: req.query.email , password: req.query.password}).toArray((err,docs)=>{
        if(!err){
            res.send({status:"ok",data:docs});
        }
        else{
            res.send({status:"failed",data:err});
        }
    })
});

app.post('/uploadDP', bodyParser.json(),(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log("Error Occured during upload ");
            console.log(err);
            res.send({status:"failed", data:err});
        }
        else{
            var userCollection = connection.db('myhome').collection('user');
            var image = req.files.profile[0].filename;
            userCollection.update({_id:ObjectID(req.body.id)},{$set:{dp:image}},(err,result)=>{
                if(!err){
                    res.send({status:"ok",data:"File Uploaded Succesfully"});
                }
                else{
                    res.send({status:"failed",data:err});
                }
            });
        }
    });
});

app.post('/removeDP',bodyParser.json(),(req,res)=>{
    var userCollection = connection.db('myhome').collection('user');
    userCollection.update({_id:ObjectID(req.body.id)},{$set:{dp:""}},(err,result)=>{
        if(!err){
            fs.unlinkSync('userUploads/'+req.body.dp);
            res.send({status:"ok",data:"DP Removed Succesfully"});
        }
        else{
            res.send({status:"failed",data:err});
        }
    });
});

app.post('/updateName' , bodyParser.json(),(req,res)=>{
    var userCollection = connection.db('myhome').collection('user');
    userCollection.update({_id:ObjectID(req.body.id)},{$set:{name:(req.body.name)}},(err,result)=>{
        if(!err){
            res.send({status:"ok",data:"Changes Made Succesfully"});
        }
        else{
            res.send({status:"failed",data:err});
        }
    }); 
});

app.post('/updateNumber' , bodyParser.json(),(req,res)=>{
    var userCollection = connection.db('myhome').collection('user');
    userCollection.update({_id:ObjectID(req.body.id)},{$set:{number:(req.body.number)}},(err,result)=>{
        if(!err){
            res.send({status:"ok",data:"Changes Made Succesfully"});
        }
        else{
            res.send({status:"failed",data:err});
        }
    }); 
});

app.listen(3000,()=>{
    console.log("Server is listing at port 3000");
});
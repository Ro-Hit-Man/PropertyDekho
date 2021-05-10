var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var app = express();
app.use(cors());

var client = new MongoClient('mongodb+srv://myhome:myhome@cluster0.zj3m5.mongodb.net/myhome?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true});
var connection;
client.connect((err,db)=>{
    if(!err){
        connection=db;
        console.log("Database Connected Successfully");
    }
    else{
        console.log(err);
    }
});

app.get('/listProperty',(req,res)=>{
    var propertyCollection = connection.db('myhome').collection('property');
    propertyCollection.find().toArray((err,docs)=>{
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

// app.get('/searchProperty',(req,res)=>{
//     var propertyCollection = connection.db('myhome').collection('property');
//     propertyCollection.find().toArray((err,docs)=>{
//         if(!err){
//             res.send({status:"ok",data:docs});
//         }
//         else{
//             res.send({status:"failed",data:err});
//         }
//     });
// });

app.post('/postProperty', bodyParser.json(), (req,res)=>{
    var propertyCollection = connection.db('myhome').collection('property');
    propertyCollection.insert(req.body , (err,result)=>{
        if(!err){
            res.send({status:"ok",data:"Property Posted Succesfully"});
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

app.listen(3000,()=>{
    console.log("Server is listing at port 3000");
});
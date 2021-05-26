var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var path = require('path');
var upload = require('./multerConfig');
var fs = require('fs');
var nodemailer = require('nodemailer');
var keys = require('./keys');

var app = express();
app.use(cors());
app.use(express.static(path.join(__dirname,'userUploads')));
app.use(express.static(path.join(__dirname,'build')));

var client = new MongoClient(keys.mongoDB.dbURI,{useNewUrlParser:true,useUnifiedTopology:true});
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

app.get('/',(req,res)=>{
    res.sendFile('index.html');
});
app.get('/Login',(req,res)=>{
    res.redirect('/');
});
app.get('/Signup',(req,res)=>{
    res.redirect('/');
});
app.get('/Profile',(req,res)=>{
    res.redirect('/');
});
app.get('/PostProperty',(req,res)=>{
    res.redirect('/');
});
app.get('/Listing',(req,res)=>{
    res.redirect('/');
});
app.get('/Details',(req,res)=>{
    res.redirect('/');
});
app.get('/Details/id',(req,res)=>{
    res.redirect('/');
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

app.post('/listProperty', bodyParser.json(),(req,res)=>{
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

app.post('/detailProperty', bodyParser.json(),(req,res)=>{
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

app.post('/connect',bodyParser.json(),(req,res)=>{
    sendMail(keys.Mail.email,keys.Mail.key, req.body.email, "Contact Email",
        "<h1>Hi! "+req.body.name+"</h1><br/>"+
        "<h1>"+req.body.username+" is interested in your property titled as :</h1><br/>"+
        "<h2>"+req.body.propertyname+" , "+req.body.location+"</h2><br/>"+
        "<h2>You can contact him on :</h2><h3>Email : "+req.body.useremail+"</h3><h3>Number :"+req.body.usernumber+"</h3><br/><br/><br/><br/>"+
        "<h4>Regards MyHome</h4>"     
    );
    res.send({status:"ok",data:"The broker/owner will contact you shortly!"});
});

app.post('/checkUser',  bodyParser.json(),(req,res)=>{
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

app.post('/verifyUser',bodyParser.json(),(req,res)=>{
    sendMail(keys.Mail.email,keys.Mail.key, req.body.email, "Verification Email","<h1>Hi! Your verification code is = "+req.body.code+"</h1>");
    res.send({status:"ok",data:"An Verification Code is send to your Email"});
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

app.post('/getUser',  bodyParser.json(),(req,res)=>{
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

app.post('/loginUser', bodyParser.json(), (req,res)=>{
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

app.post('/forgotPassword', bodyParser.json(),(req,res)=>{
    var userCollection = connection.db('myhome').collection('user');
    userCollection.find({email: req.query.email}).toArray((err,data)=>{
        if(!err){
            sendMail(keys.Mail.email,keys.Mail.key, req.query.email, "Forgot Password","<h1>Hi!"+data[0].name+"<br/> Your password is = "+data[0].password+"</h1>");
            res.send({status:"ok",data:"An Email is send to you..."});
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
            fs.unlinkSync(req.body.dp);
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

function sendMail(from, appPassword, to, subject,  htmlmsg){
    let transporter=nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
             user:from,
             pass:appPassword
            }
        });

    let mailOptions={
       from:from ,
       to:to,
       subject:subject,
       html:htmlmsg
    };

    transporter.sendMail(mailOptions ,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log('Email sent:'+info.response);
        }
    });
}

app.listen(80,()=>{
    console.log("Server is listing at port 80");
});
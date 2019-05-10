const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const ObjectID = require('mongodb').ObjectID

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let router = require('./app/routers/s3.router.js');
app.use('/', router);

const whitelist = ['https://dev-t3kskspy.auth0.com','https://service.zhenglyu.com','http://localhost:4200']
const cors = require('cors')
const corsOptions = {
  origin:(origin,callback)=>{
    // if (whitelist.indexOf(origin) !== -1) {
    //   callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
    callback(null,true)
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
 


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Jim:$Zyf1989528@scheduledb-2yn2v.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  const userCollection = client.db("test").collection("userDatabase");


  const server = app.listen(3000, function () {
 
    let host = server.address().address
    let port = server.address().port
   
    console.log("App listening at http://%s:%s", host, port); 
  })

  app.get('/',(req,res)=>{
    res.send('hihihi');
  });


/*SignUp Email */


  app.post("/api/signupemail",(req,res)=>{
    if(err){
      consol.log(err);
    }
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jimlyu1573@gmail.com',
        pass: 'ZLfc1993419'
      }
    });

    var mailOptions = {
      from: 'jimlyu1573@gmail.com',
      to: 'zhenglyu@bu.edu',
      subject: 'You have a new appointment from ',
      text: JSON.stringify(req.body)
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
  
  /*SignUp Email */

  
/*Store Customer */

  app.post("/api/createCustomer",(req,res)=>{
    let user = req.body;
    console.log(user);

    userCollection.insertOne(user,(err,doc)=>{
      if(err){
        handleError(res, err.message, "Failed to create a new user.")
      } else{
        res.status(201).json(doc.ops[0]);
      }
    })
  })

  app.get("/api/customer/:id",(req,res)=>{
    console.log(req.params.id);
    let id = req.params.id;
    userCollection.find({clientName:id}).toArray((err,docs)=>{
      if(err){
        console.log("Failed to get Customers.")
      } 
        res.status(200).json(docs);
    })
  })

  app.post("/api/modifyCustomer",(req, res)=>{
    let target = req.body;
    console.log(req.body);
    let id  = new ObjectID(target._id)
    delete target._id;
    // let id  = new ObjectID(target._id)
    userCollection.replaceOne({_id:id},target,{ upsert: true });
  })

/*Store Customer */
  app.get("/api/schedules",(req,res)=>{
    collection.find({}).toArray((err,docs)=>{
      if(err){
        console.log("Failed to get schedules.")
      } 
        res.status(200).json(docs);
    });
  });

  app.post("/api/createschedules",(req,res)=>{
    let newSchedule = req.body;
    
    if(!req.body.Name){
      handleError(res,"Invalid user Input","Must Provide a name",400);
    }
    collection.insertOne(newSchedule,(err,doc)=>{
      if(err){
        handleError(res,err.message,"Failed to create a new Schedule");
      } else{
        res.status(201).json(doc.ops[0]);
      }

    var transporter = nodemailer.createTransport({
      host: 'email-smtp.us-west-2.amazonaws.com',
      port:465,
      secure:true,
      auth:{
        user:'AKIAYOHQWM5H6XTKZ773',
        pass:'BJ9XoiIs9Rncn9mXmFrP7HCJhiEBZs6xtqzKfZXtrIcG'
      }
    });

    var mailOptions = {
      from: 'demo@ahatis.com',
      to: 'zhenglyu@bu.edu',
      subject: 'You have a new appointment from ',
      text: JSON.stringify(req.body)
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    });
    
  app.post("/api/sendemail",(req,res)=>{
    let message = req.body;
    console.log(message);
  });

  


  });
  
  
});
 
// Create a Server

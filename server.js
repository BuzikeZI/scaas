const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
 
let router = require('./app/routers/s3.router.js');
app.use('/', router);

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Jim:$Zyf1989528@scheduledb-2yn2v.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  let myObj = {name:"Joey"};
  // collection.insertOne(myObj,(err,res)=>{
  //     console.log('success');
  // })

  const server = app.listen(8080, function () {
 
    let host = server.address().address
    let port = server.address().port
   
    console.log("App listening at http://%s:%s", host, port); 
  })

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
    
  app.post("/api/sendemail",(req,res)=>{
    let message = req.body;
    console.log(message);
  });


  });
  
  
});
 
// Create a Server

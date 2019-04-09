const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Jim:$Zyf1989528@scheduledb-2yn2v.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  let myObj = {name:"Joey"};
  collection.insertOne(myObj,(err,res)=>{
      console.log(res);
  })
  client.close();
});
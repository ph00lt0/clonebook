const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'clonebook';

app.get("/users", (req, res) => {

  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection('users');
    collection.find({}).toArray(function(err, docs) {
      console.log("Found the following records");
      console.log(docs);
      res.header("Access-Control-Allow-Origin", "*");
      res.send(docs)
    });      
    client.close();
  });
});

app.listen(80, err => {
  if(err){console.log("server cannot listen"); return}
  console.log("server listening...");
});

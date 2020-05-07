const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'clonebook';
const ObjectID = require('mongodb').ObjectID;
const formidable = require('formidable');
let db = '';
let usersCollection = '';

// Use connect method to connect to the server
MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
    console.log("Connected successfully to db");
    db = client.db(dbName); // connection pool
    usersCollection = db.collection('users');
});

app.get("/users", (req, res) => {
    console.log("Connected successfully to server");
    const collection = db.collection('users');
    collection.find({}).toArray(function (err, docs) {
        console.log("Found the following records");
        console.log(docs);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(docs)
    });
});


app.post("/users", (req, res) => {
    const form = formidable({multiples: true});

    form.parse(req, (err, fields, files) => {
        const username = fields.username;
        const password = fields.password;
        usersCollection.insertOne({
            username,
            password
        }, (err, result) => {
            if(err){console.log('cannot insert'); return}
            res.status(200).send(`${username} ${password} ${result.insertedId}`)
        });
    });
});

app.post("/posts", (req, res) => {
    const form = formidable({multiples: true});

    form.parse(req, (err, fields, files) => {
        const userId = "5eb3d956baeda6d63701002a";
        const message = fields.message;
        const collection = db.collection('users');
        const postID = new ObjectID();
        collection.findOneAndUpdate({
                _id: new ObjectID(userId)
            }, {
                $push: {posts: {_id: postID, message}}
            }, (err, result) => err ? res.json(err) : res.json(postID)
        );
    });
});

app.listen(8080, err => {
    if (err) {
        console.log("server cannot listen");
        return
    }
    console.log("server listening...");
});

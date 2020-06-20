import sirv from 'sirv';
// import polka from 'polka';
import express from 'express'
import compression from 'compression';
import * as sapper from '@sapper/server';
import * as mongo from '@clonebook/mongo';
import User from '@clonebook/models/user.js';
import isAuthenticated from '@clonebook/middleware.js';
import http from 'http';

const app = express();

const {PORT, NODE_ENV} = process.env;
const dev = NODE_ENV === 'development';

app.use(express.urlencoded());
app.use(express.json());
app.use(isAuthenticated);

let server = app.use(
    compression({threshold: 0}),
    sirv('static', {dev}),
    sapper.middleware()
).listen(PORT, err => {
    if (err) console.log('error', err);
});

// require after declaration of server
const io = require("socket.io")(server);
let clients = [];

io.on('connection', (socket) => {

    socket.on('register', (userID) => {
        console.log('connected')

        // todo authenticate in some way...
        User.findOneAndUpdate({
            _id: userID
        }, {
            $set: {status: true}
        }, (err, user) => {
            if (err) console.log(err);
            else {
                let obj = {};
                obj[socket.id] = userID;
                clients.push(obj);
            }
        });
    });

    socket.on('message', (msg, friendID) => {
        let friendsSocket = clients[friendID];
        socket.to(friendsSocket).emit('message', msg, friendID);
    });


    socket.on('disconnect', () => {
        const sId = socket.id;
        for (let i = 0; i < clients.length; i++) {
            if (clients[i][sId]) {
                User.findOneAndUpdate({_id: clients[i][sId]}, {$set: {status: false}}, (err, user) => {
                    if (err) console.log(err);
                    else delete clients[i]; console.log('disconnected')
                });
            }
        }
    });
});


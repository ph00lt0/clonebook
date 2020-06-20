import sirv from 'sirv';
// import polka from 'polka';
import express from 'express'
import compression from 'compression';
import * as sapper from '@sapper/server';
import * as mongo from '@clonebook/mongo';
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
const clients = [];

io.on('connection', (socket) => {

    socket.on('register', function (userID) {
        clients[userID] = socket.id;
        console.log('registered user')
    });

    //todo set user status online
    socket.on('message', function (msg, friendID) {
        let friendsSocket = clients[friendID];
        socket.to(friendsSocket).emit('message', msg, friendID);
    });


    socket.on('disconnect', function () {
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].userID === socket.id) {
                delete clients[i];
            }
        }
        //todo make user  status offline
    });
});


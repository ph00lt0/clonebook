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

io.on('connection', (socket) => {
    // set user status online
    console.log('Hello connection')

    socket.on('message', function (msg) {
        socket.broadcast.emit('message', msg);
    });


    socket.on('disconnect', function () {
        // make user  status offline
    });
});


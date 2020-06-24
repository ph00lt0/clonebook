import sirv from 'sirv';
import express from 'express'
import compression from 'compression';
import * as sapper from '@sapper/server';
import * as mongo from '@clonebook/mongo';
import User from '@clonebook/models/user.js';
import isAuthenticated from '@clonebook/middleware.js';

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
let clients = {};

io.on('connection', (socket) => {

    socket.on('register', (userID) => {
        // todo authenticate in some way...
        User.findOneAndUpdate({
            _id: userID
        }, {
            $set: {status: true}
        }, (err, user) => {
            if (err) console.log(err);
            else {
                clients[socket.id] = userID;
                const friends = user.friends;
                for (let i = 0; i < friends.length; i++) {
                    User.findById(friends[i].id, function (err, friend) {
                        if (err) return res.status(500).json("Clonebook cannot get user");
                        for (let i = 0; i < friend.friends.length; i++) {
                            if (friend.friends[i].id === user.id) {
                                friend.friends[i].status = true;
                                let friendsSocket = Object.keys(clients).find(key => clients[key] === friend.id);
                                socket.to(friendsSocket).emit('online', userID);
                            }
                        }
                        friend.save(function (err) {
                            if (err) throw err;
                        });
                    });
                }
            }
        });
    });

    socket.on('message', (message, friendID, userID) => {
        const friendsSocket = Object.keys(clients).find(key => clients[key] === friendID);
        socket.to(friendsSocket).emit('message', message, userID);
    });


    socket.on('disconnect', () => {
        const sId = socket.id;

        User.findOneAndUpdate({_id: clients[sId]}, {$set: {status: false}}, (err, user) => {
            if (err) console.log(err);
            else {
                delete clients[sId];
                if (user === null) {
                    return
                }
                const friends = user.friends;
                for (let i = 0; i < friends.length; i++) {
                    User.findById(friends[i].id, function (err, friend) {
                        if (err) return res.status(500).json("Clonebook cannot get user");
                        for (let i = 0; i < friend.friends.length; i++) {
                            if (friend.friends[i].id === user.id) {
                                friend.friends[i].status = false;
                                const friendsSocket = Object.keys(clients).find(key => clients[key] === friend.id);
                                socket.to(friendsSocket).emit('offline', user.id);
                            }
                        }
                        friend.save(function (err) {
                            if (err) throw err;
                        });
                    });
                }
            }
        });

    });
});


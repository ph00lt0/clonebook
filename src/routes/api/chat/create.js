import User from '@clonebook/models/user.js';
import emitter from '@clonebook/events.js';

const ObjectID = require('mongodb').ObjectID;
require('dotenv').config();
const jwt = require('jsonwebtoken');

export async function post(req, res, next) {
    let token = req.headers['authorization']; // obtain from post in request
    jwt.verify(token, process.env.JWT_SIGNATURE, function (err, decoded) {
        if (err || decoded == undefined) {
            console.log(err);
            return res.redirect('/login');
        }
        //next
        const decodedJWT = jwt.decode(token);
        const userID = decodedJWT['id'];
        const message = req.body.message;
        const friendID = req.body.friendID;
        const messageID = new ObjectID();

        User.findById(userID, function (err, user) {
            if (err) return res.status(500).json("Clonebook cannot get user");

            const friends = user.friends;
            for (let i = 0; i < friends.length; i++) {
                if (friends[i].id === friendID) {
                    friends[i].messages.push({_id: messageID, message});

                    User.findById(friends[i].id, function (err, friend) {
                        if (err) return res.status(500).json("Clonebook cannot get user");
                        const friends = friend.friends;
                        for (let i = 0; i < friends.length; i++) {
                            if (friends[i].id === userID) {
                                friends[i].messages.push({_id: messageID, message, "by_me": false, "read": false});
                            }
                            friend.save(function (err) {
                                if (err) throw err;
                            });
                        }
                    });
                }
            }
            user.save(function (err) {
                if (err) throw err;
            });
            emitter.emit('updateMessages', friendID);
            return res.status(200).json("Sent message");
        });
    });
}

import User from '@clonebook/models/user.js';

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
        const userId = decodedJWT['id'];
        const message = req.body.message;
        const postID = new ObjectID();
        User.findOneAndUpdate({
                _id: userId
            }, {
                $push: {posts: {_id: postID, message}}
            }, (err, user) => {
                if (err) return res.status(500).json("Clonebook cannot find user");

                // add post to friends
                for (let i = 0; i < user.friends.length; i++) {
                    User.findById(user.friends[i].id, function (err, friend) {
                        if (err) return res.status(500).json("Clonebook cannot get user");

                        const friends = friend.friends;
                        for (let i = 0; i < friends.length; i++) {
                            if (friends[i].id === userId) {
                                friends[i].posts.push({_id: postID, message})
                            }
                            friend.save(function (err) {
                                if (err) throw err;
                            });
                        }
                    });
                }
                return res.status(200).json("Created post")
            }
        );
    });
}

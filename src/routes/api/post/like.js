import User from '@clonebook/models/user.js';

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
        const postID = req.body.postID;
        const postUserID = req.body.userID;

        User.findById(postUserID, function (err, user) {
            if (err) {
                return res.status(500).json("Clonebook cannot get user")
            }
            var posts = user.posts;
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].id === postID) {
                    if (posts[i].liked_by.includes(userID)) {
                        posts[i].liked_by.splice(posts[i].liked_by.indexOf(userID), 1);
                    } else posts[i].liked_by.push(userID);
                    user.save(function (err) {
                        if (err) throw err;
                    });

                    for (let i = 0; i < user.friends.length; i++) {
                        User.findById(user.friends[i].id, function (err, friend) {
                                if (err) return res.status(500).json("Clonebook cannot get user");

                                const friends = friend.friends;
                                for (let i = 0; i < friends.length; i++) {
                                    if (friends[i].id === user.id) {
                                        posts = friends[i].posts;
                                        for (let i = 0; i < posts.length; i++) {
                                            if (posts[i].id === postID) {
                                                if (posts[i].liked_by.includes(userID)) {
                                                    posts[i].liked_by.splice(posts[i].liked_by.indexOf(userID), 1);
                                                } else posts[i].liked_by.push(userID);
                                                friend.save(function (err) {
                                                    if (err) throw err;
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        );
                    }

                    return res.status(200).json("OK")
                }
            }
        });
    });
}

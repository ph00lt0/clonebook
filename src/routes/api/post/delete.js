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
        const postID = req.body.postID;
        User.findOneAndUpdate({
                _id: new ObjectID(userId)
            }, {
                $pull: {posts: {_id: postID}}
            }, (err, user) => {
                if (err) return res.status(500).json("Clonebook cannot find user");

                // delete post from friends
                for (let i = 0; i < user.friends.length; i++) {
                    User.findById(user.friends[i].id, function (err, friend) {
                        if (err) return res.status(500).json("Clonebook cannot get user");

                        const friends = friend.friends;
                        for (let i = 0; i < friends.length; i++) {
                            if (friends[i].id === userId) {
                                friends[i].posts.pull({_id: postID})
                            }
                            friend.save(function (err) {
                                if (err) throw err;
                            });
                        }
                    });
                }
                return res.status(200).json("Removed post")
            }
        );
    });
}

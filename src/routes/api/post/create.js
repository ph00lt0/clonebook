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
                _id: new ObjectID(userId)
            }, {
                $push: {posts: {_id: postID, message}}
            }, (err, result) => err ? res.end(JSON.stringify(err)) : res.end(JSON.stringify(postID))
        );
    });
}
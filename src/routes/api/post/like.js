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
            var posts = user.posts;
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].id === postID) {
                    if (posts[i].liked_by.includes(userID)) {
                          posts[i].liked_by.splice(posts[i].liked_by.indexOf(userID), 1);
                    }
                    else posts[i].liked_by.push(userID);

                    user.save(function (err) {
                        if (err) throw err;
                    });
                }
            }
        });
    });
}

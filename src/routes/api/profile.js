import User from '@clonebook/models/user.js';

require('dotenv').config();
const jwt = require('jsonwebtoken');

export async function post(req, res, next) {
    let token = req.headers['authorization']; // obtain from post in request
    jwt.verify(token, process.env.JWT_SIGNATURE, function (err, decoded) {
        if (err || decoded == undefined) {
            return res.redirect('/login');
        }
        const decodedJWT = jwt.decode(token);
        const userID = decodedJWT['id'];
        const value = req.body.value;
        const key = req.body.key;

        const publicKeys = ['firstName', 'lastName', 'username', 'avatar'];
        const privateKeys = ['email', 'password'];

        if (!publicKeys.includes(key) && !privateKeys.includes(key)) return res.status(400).json("Bad request");

        User.findOneAndUpdate({
                _id: userID
            },
            {
                $set: {[key]: value}
            }, (err, user) => {
                if (err) return res.status(500).json("Clonebook cannot find user");

                if (privateKeys.includes(key)) return res.status(200).json("Updated user");

                for (let i = 0; i < user.friends.length; i++) {
                    User.findById(user.friends[i].id, function (err, friend) {
                        if (err) return res.status(500).json("Clonebook cannot get user");
                        for (let i = 0; i < friend.friends.length; i++) {
                            if (friend.friends[i].id === user.id) {
                                friend.friends[i][key] = value;
                            }
                        }
                        friend.save(function (err) {
                            if (err) throw err;
                        });
                    });
                }
                res.status(200).json("Updated user");
            });
    });
}

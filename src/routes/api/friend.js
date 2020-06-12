import User from '@clonebook/models/user.js';

require('dotenv').config();
const jwt = require('jsonwebtoken');

export async function post(req, res) {
    let token = req.headers['authorization']; // obtain from post in request
    jwt.verify(token, process.env.JWT_SIGNATURE, function (err, decoded) {
        if (err || decoded == undefined) {
            console.log(err);
            return res.redirect('/login');
        }
        //next
        const decodedJWT = jwt.decode(token);
        const userID = decodedJWT['id'];
        const friendID = req.body.friendID;

        //todo add check for invitations

        User.findById(userID, function (err, user) {
            if (err) {
                return res.status(500).json("Clonebook cannot get user")
            }
            const friends = user.friends;
            for (let i = 0; i < friends.length; i++) {
                if (friends[i].id === friendID) {
                    friends.splice(i, 1);
                } else {
                    //todo only add public items to friends array
                    User.findOneAndUpdate({_id: friendID}, {$addToSet: {friends: user}}, (err, friend) => {
                        if (err) {
                            return res.status(500).json("Clonebook cannot find friend")
                        }
                        friends.push(friend);
                    });
                }
            }
            user.save(function (err) {
                if (err) throw err;
            });
        });
    });
}

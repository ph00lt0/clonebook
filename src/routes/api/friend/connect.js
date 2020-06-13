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
        const inviteID = req.body.inviteID;


        User.findById(userID, function (err, user) {
                if (err) return res.status(500).json("Clonebook cannot get user");

                const invitations = user.invitations;
                for (let i = 0; i < invitations.length; i++) {
                    if (invitations[i].id === inviteID) {
                        User.findOne({_id: inviteID},
                            ['firstName', 'lastName', 'username', 'avatar', 'status', 'posts'],
                            (err, friend) => {
                                if (err) return res.status(500).json("Clonebook cannot find user");
                                user.friends.push(friend);

                                User.findOne({_id: userID},
                                    ['firstName', 'lastName', 'username', 'avatar', 'status', 'posts'],
                                    (err, currentUserFriendData) => {
                                        if (err) return res.status(500).json("Clonebook cannot find user")
                                        User.findOneAndUpdate({_id: inviteID},
                                            {$addToSet: {friends: currentUserFriendData}}, (err) => {
                                            if (err) return res.status(500).json("Clonebook cannot find user")
                                        });
                                    });

                                invitations.splice(i, 1);

                                user.save(function (err) {
                                    if (err) throw err;
                                });
                                return res.status(200).json("Connected with new friend")
                            });
                    }
                }
            }
        );
    });

    // User.findById(userID, function (err, user) {
    //     if (err) {
    //         return res.status(500).json("Clonebook cannot get user")
    //     }
    //     const friends = user.friends;
    //     for (let i = 0; i < friends.length; i++) {
    //         if (friends[i].id === inviteID) {
    //             friends.splice(i, 1);
    //         } else {
    //             User.findOneAndUpdate({_id: inviteID}, {$addToSet: {friends: user}}, (err, friend) => {
    //                 if (err) {
    //                     return res.status(500).json("Clonebook cannot find friend")
    //                 }
    //                 friends.push(friend);
    //             });
    //         }
    //     }
    //     user.save(function (err) {
    //         if (err) throw err;
    //     });
    // });
}

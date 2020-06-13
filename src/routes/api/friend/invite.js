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

        //get object of other user
        User.findById(inviteID, function (err, user) {
            if (err) {
                return res.status(500).json("Clonebook cannot get user")
            }
            const invitations = user.invitations;
            for (let i = 0; i < invitations.length; i++) {
                if (invitations[i].id === userID) {
                    invitations.splice(i, 1);
                    user.save(function (err) {
                        if (err) throw err;
                    });
                    return res.status(200).json("Removed invitation")
                }
            }
            //get own user data
            User.findOne({_id: userID}, ['firstName', 'lastName', 'username', 'avatar'], (err, invite) => {
                if (err) {
                    return res.status(500).json("Clonebook cannot find user")
                }
                invitations.push(invite);
                user.save(function (err) {
                    if (err) throw err;
                });
                return res.status(200).json("Invited user")
            });

        });
    });
}

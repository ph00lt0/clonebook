import User from '@clonebook/models/user.js';
const ObjectID = require('mongodb').ObjectID;

export async function post(req, res) {
    User.create({
            _id: new ObjectID(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            avatar: "avatar.png",
            username: req.body.username,
            password: req.body.password,
            status: false,
            posts: [],
            friends: [],
            invitations: [],
        }, (err, result) => err ? res.end(JSON.stringify(err)) : res.end(JSON.stringify("created user"))
    );
}

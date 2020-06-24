import User from "@clonebook/models/user";

const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const jwt = require('jsonwebtoken');
require('dotenv').config();

export function post(req, res) {
    const form = formidable({multiples: true});

    form.parse(req, (err, fields, files) => {
        if (err) res.status(400).end('Could not parse data');
        console.log(err);

        if (!files) return res.status(400).end('No files were uploaded');
        if (!files.avatar) return res.status(400).end('No files were uploaded');

        if (!files.avatar.name.match(/.(jpg|jpeg|png)$/i)) {
            fs.unlink(files.avatar.path, () => {
            });
            return res.status(400).end({"message": "File needs to be .jpg, .jpeg or .png"});
        }

        let token = req.headers['authorization']; // obtain from post in request
        jwt.verify(token, process.env.JWT_SIGNATURE, function (err, decoded) {
            if (err || decoded == undefined) {
                fs.unlink(files.avatar.path, () => {
                });
                return res.redirect('/login');
            }
            const decodedJWT = jwt.decode(token);
            const userID = decodedJWT['id'];
            const fileName = new Date().valueOf() + files.avatar.name;
            const destination = path.join("./", "static", "upload", "avatars", fileName);

            fs.copyFile(files.avatar.path, destination, async (err) => {
                fs.unlink(files.avatar.path, () => {
                });
                if (err) return res.status(500).send({"message": "Could not write to destination"});

                User.findOneAndUpdate({
                        _id: userID
                    },
                    {
                        $set: {avatar: fileName}
                    }, (err, user) => {
                        if (err) return res.status(500).json("Clonebook cannot find user");

                        for (let i = 0; i < user.friends.length; i++) {
                            User.findById(user.friends[i].id, function (err, friend) {
                                if (err) return res.status(500).json("Clonebook cannot get user");
                                for (let i = 0; i < friend.friends.length; i++) {
                                    if (friend.friends[i].id === user.id) {
                                        friend.friends[i].avatar = fileName;
                                    }
                                }
                                friend.save(function (err) {
                                    if (err) throw err;
                                });
                            });
                        }
                        res.status(200).end('Uploaded avatar');
                    });
            });
        });
    });
}

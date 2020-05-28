import User from "@clonebook/models/user";
const jwt = require('jsonwebtoken');
require('dotenv').config();

export function post(req, res, next) {
    if (!req.body) {
        return res.status(400).end(JSON.stringify({"message": "Bad request"}));
    }
    try {
        User.findOne( { "username": req.body['username'] }, function(err, result) {
            if(err){
                return res.status(401).end(JSON.stringify({"message": "Incorrect credentials"}));
            }
            if(req.body['password'] !== result.password) {
                return res.status(401).end(JSON.stringify({"message": "Incorrect credentials"}));
            }
            const token = jwt.sign({id: result._id, username: result.username}, process.env.JWT_SIGNATURE);
            return res.send({'token':token})
        });
    } catch (err) {
        return res.status(401).end(JSON.stringify({"message": "Cannot connect to database"}));
    }
}

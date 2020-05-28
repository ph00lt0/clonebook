import User from "@clonebook/models/user";
const jwt = require('jsonwebtoken');
require('dotenv').config();

export function post(req, res, next) {
    if (!req.body) {
        res.status(400);
        return res.err (JSON.stringify({"message": "Bad request"}));
    }
    try {
        User.findOne( { "username": req.body['username'] }, function(err, result) {
            if(err){
                res.status(401);
                return res.end(JSON.stringify({"message": "Incorrect credentials"}));
            }
            if(req.body['password'] !== result.password) {
                res.status(401);
                return res.end(JSON.stringify({"message": "Incorrect credentials"}));
            }
            const token = jwt.sign({id: result._id, username: result.username},
                process.env.JWT_SIGNATURE);
            return res.send({'token':token})
        });
    } catch (err) {
        console.log("Incorrect credentials")
    }
}

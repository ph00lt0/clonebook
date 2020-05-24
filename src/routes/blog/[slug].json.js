let mongoose = require("mongoose");
const formidable = require('formidable');
const User = require("../models/user");

export async function get(req, res, next) {
    const {slug} = req.params;
    const {db} = await init();
    const user = await db.collection('users').findOne({slug});

    if (user) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(user));
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: `Not found`
        }));
    }
}


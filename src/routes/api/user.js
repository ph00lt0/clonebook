import User from '@clonebook/models/user.js';
require('dotenv').config();
const jwt = require('jsonwebtoken');

export async function get(req, res) {
	if (!req.headers.authorization) {
		return res.redirect('/login');
	}

	let token = req.headers['authorization']; // obtain from post in request
	jwt.verify(token, process.env.JWT_SIGNATURE, function (err, decoded) {
		if (err || decoded == undefined) {
			console.log(err);
			return res.redirect('/login');
		}
		//next
		const decodedJWT = jwt.decode(token);
		const id = decodedJWT['id'];
		User.findOne( { "_id": id }, function(err, result) {
			if(err){
				res.end(JSON.stringify({"message": "user.js not found"}));
			}
			res.end(JSON.stringify(result));
		});
	});
}

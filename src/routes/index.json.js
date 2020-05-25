const path = require('path');
import User from '@clonebook/models/user.js';
const formidable = require('formidable');
const ObjectID = require('mongodb').ObjectID;


export async function get(req, res) {
	const id = "5eb3d956baeda6d63701002a";
	User.findOne( { "_id": id }, function(err, result) {
		if(err){
			res.end(JSON.stringify({"message": "user.js not found"}));
		}
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify(result));
	});
}

export async function post(req, res, next) {
	const form = formidable({multiples: true});
	await form.parse(req, (err, fields, files) => {
		const userId = "5eb3d956baeda6d63701002a";
		const message = fields.message;
		const postID = new ObjectID();
		User.findOneAndUpdate({
				_id: new ObjectID(userId)
			}, {
				$push: {posts: {_id: postID, message}}
			}, (err, result) => err ? res.end(JSON.stringify(err)) : res.end(JSON.stringify(postID))
		);
	});
}

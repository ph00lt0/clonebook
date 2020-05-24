var path = require('path');
const User = require(path.join("../../../", "src", "models", "user.js"));
const formidable = require('formidable');
const ObjectID = require('mongodb').ObjectID;


export async function get(req, res) {
	const id = "5eb3d956baeda6d63701002a";
	User.find( { "name": "b" }, function(err, result) {
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
	const {slug} = req.params;
	const post = req.body;
	const form = formidable({multiples: true});

	form.parse(req, (err, fields, files) => {
		const userId = "5eb3d956baeda6d63701002a";
		const message = fields.message;
		const postID = new ObjectID();
		User.findOneAndUpdate({
				_id: new ObjectID(userId)
			}, {
				$push: {posts: {_id: postID, message}}
			}, (err, result) => err ? res.json(err) : res.json(postID)
		);
	});
}

import User from '@clonebook/models/user.js';
const formidable = require('formidable');
const ObjectID = require('mongodb').ObjectID;


export async function post(req, res, next) {
    const form = formidable({multiples: true});
    await form.parse(req, (err, fields, files) => {
        const userId = "5eb3d956baeda6d63701002a";
        const postID = fields.id;
        User.findOneAndUpdate({
                _id: new ObjectID(userId)
            }, {
                $pull: {posts: {_id: postID}}
            }, (err, result) => err ? res.end(JSON.stringify(err)) : res.end(JSON.stringify(postID))
        );
    });
}

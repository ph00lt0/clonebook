import posts from './_posts.js';
import {init} from "@clonebook/mongo";

export async function get(req, res, next) {
    // the `slug` parameter is available because
    // this file is called [slug].json.js
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

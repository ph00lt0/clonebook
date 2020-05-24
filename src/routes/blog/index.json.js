import { init } from "@clonebook/mongo"

export async function get(req, res) {
	const {db} = await init();
	const users = await db.collection('users').find({}).toArray();

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(users));
}
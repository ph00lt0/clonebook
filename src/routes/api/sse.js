import User from '@clonebook/models/user.js';
import emitter from '@clonebook/events.js';

const sessions = [];

export async function get(req, res) {
    res.set("Content-Type", "text/event-stream");
    res.set("Connection", "keep-alive");
    res.set("Cache-Control", "no-cache");
    res.set("Access-Control-Allow-Origin", "*");

    emitter.on('updateMessages', (data) => {
        console.log('emmitter should write now');
		res.status(200).write(`data: ` + data + `\n\n`)
	})


    // try {
    //     setInterval(async () => {
    //         User.findOne({"_id": id}, function (err, result) {
    //             if (err) res.end(JSON.stringify({"message": "User not found"}));
    //             res.status(200).write(`data: ` + JSON.stringify(result) + `\n\n`)
    //         });
    //     }, 100);
    // } catch (err) {
    //     console.log(err);
    //     return res.status(500).send({"message": "Could not start SSE"});
    // }
}

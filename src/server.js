import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
const mongoose = require("mongoose");

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);

mongoose.connect("mongodb://localhost:27017/clonebook", { useNewUrlParser: true, useUnifiedTopology:true })
	.then(() => {
		console.log("Database is connected");
	})
	.catch(err => {
		console.log({ database_error: err });
	});

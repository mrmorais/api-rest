import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import UserRouter from './routers/user';

const app = express();

//const user = require('./routers/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/user', UserRouter);

let config = require('./config');
let options = { 
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
};

mongoose.connect(config.env_test.MONGO_DB, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));


let port = 3000;
app.listen(port, ()=>{
	console.log(`Server started at ::${port}`);
});

module.exports = app;

import { Router } from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

let UserRouter = Router();

let User = require('../models/user');

//>> /user

//PUT a new user
UserRouter.put('/', (req, res)=>{

	if(req.body.first_name==undefined || req.body.last_name==undefined || req.body.age ==undefined ) {
		console.log("here");
		res.json({
			status: 'fail'
		});

		res.status(400).end();
	} else {
		let new_user = new User(req.body);
		new_user.save()
		.then((doc)=>{
			res.json({
				status: 'success',
				data: doc
			})
			.end();
		})
		.catch((e)=>{
			res.json({
				status:'fail'
			})
			.status(400)
			.end();
		});
	}
});

//GET all Users
UserRouter.get('/', (req, res)=>{
	res.send({'ok':'ok'});
	
});

export default UserRouter;

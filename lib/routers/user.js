import { Router } from 'express';
import 	mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

let UserRouter = Router();

let User = require('../models/user');

//>> /user

//PUT a new user
UserRouter.put('/', (req, res)=>{
	if(req.body.first_name==undefined || req.body.last_name==undefined || req.body.age ==undefined ) {
		res.status(400).json({status: 'fail'});
	} else {
		let new_user = new User(req.body);
		new_user.save()
		.then((doc)=>{
			res.json({
				status: 'success',
				data: doc
			});
		})
		.catch((e)=>{
			res.status(400).json({
				status:'fail'
			});
		});
	}
	
});

//GET all Users
UserRouter.get('/', (req, res)=>{
	User.find({}).exec((err, docs)=>{
		if(err) res.json({status: 'fail'});
		
		res.json({
			status: 'success',
			data: docs
		});
	});
});

//GET user with id
UserRouter.get('/:id', (req, res)=>{
	let fields_query = '';
	if(req.query.fields) {
		let fields;
		fields = req.query.fields.toString().split(',');
		fields.forEach((item)=>{
			fields_query += ' ' + item;
		});
	}
	User.findOne({_id: req.params.id}, fields_query)
	.exec((err, doc)=>{
		if(err) res.json({status:'fail'});
		
		res.json({
			status: 'success',
			data: doc
		});
	});
});


export default UserRouter;

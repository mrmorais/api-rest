const mongoose = require('mongoose');

let user = new mongoose.Schema({
	first_name: String,
	last_name: String,
	age: Number
});

module.exports = mongoose.model('User', user);

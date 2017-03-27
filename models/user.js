var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// User model, because we cant not use mongoose and tons of other stuff
var User = mongoose.Schema({
	username: String,
	password: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
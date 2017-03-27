var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

const authenticationMiddleware = require('./middleware')
var User = require('../models/user'); 
// Need to backtrack out of authentication to reference this file

/*
const user = { // 
  username: 'test-user',
  password: 'test-password',
  id: 1
}
*/
/*
// Integrate mongoDB search into this!!!
function findUser (username, callback) {
  if (username === user.username) {
    return callback(null, user)
  }
  return callback(null)
}
*/
// Init 
/*
	function initPassport () {
	  passport.use(new LocalStrategy( 
		function(username, password, done) {
		  findUser(username, function (err, user) {
			if (err) {
			  return done(err)
			}
			if (!user) {
			  return done(null, false)
			}
			if (password !== user.password  ) {
			  return done(null, false)
			}
			return done(null, user)
		  })
		}
	  ))

	  //passport.   = authenticationMiddleware
	};
*/

// Login Strategy
	//passport.use('login', new LocalStrategy({
	/*
passport.use( 'local-login', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'userpass',
	passReqToCallback : true
  },
  function(req, username, password, done) { 
	// check in mongo if a user with username exists or not
	// Find how to integrate mongo...
	User.findOne({ 'user' :  username }, 
	  function(err, user) {
		// In case of any error, return using the done method
		if (err)
		  return done(err);
		// Username does not exist, log error & redirect back
		if (!user){
		  console.log('User Not Found with username '+username);
		  return done(null, false, 
				req.flash('message', 'User Not found!'));                 
		}
		// User exists but wrong password, log the error 
		if (!isValidPassword(user, password)){
		  console.log('Invalid Password');
		  return done(null, false, 
			  req.flash('message', 'Invalid Password!'));
		}
		// User and password both match, return user from 
		// done method which will be treated like success
		return done(null, user);
	  }
	);
}));


module.exports.init = initPassport;

function initPassport(app){

	passport.serializeUser(function (user, cb) {
	  cb(null, user.username)
	});

	passport.deserializeUser(function (username, cb) {
	  findUser(username, cb)
	});
	
	require('./strategies/local').init();
// End Export
};
//module.exports = initPassport
*/

//usernameField: 'username',
	//passwordField: 'userpass',
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


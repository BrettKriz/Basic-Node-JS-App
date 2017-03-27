/*
// Start DB:
// cd C:\Program Files\MongoDB\Server\3.4\bin
// mongod --dbpath "C:\Program Files\nodejs\Project2\basicapp\data
// db.usercollection.find().pretty()
// Start Server:
// cd C:\Program Files\nodejs\Project2\basicapp
// npm start

http://localhost:3000/newuser 
http://localhost:3000/userlist
http://localhost:3000/adduser

*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// DB stuff
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/basicapp');
var mongoose = require('mongoose');

// Passport stuff
var passport = require('passport')  
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');  
//var session = require('express-session')

//var index = require('./routes/index'); // var routes?
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup @@@TAKE OFF JADE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('tester')); // @@@ Needs an argument to enable secret
// @@@ \/ Not secure, change to backend session IRL!!!
//app.use(cookieSession());
//app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var initPassport = require('./authentication/init');//(passport);
//initPassport(passport);


// Make our db accessible to our router
app.use(function(req,res,next){ // @@@ Not optimized!!!
    req.db = db;
    next();
});

// Connect Mongoose to DB
mongoose.connect('localhost:27017/basicapp', function(err) {
  if (err) {
    console.log('Unable to connect to DB!');
  }
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

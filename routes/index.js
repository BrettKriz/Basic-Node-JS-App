var express = require('express');
var router = express.Router();

/* GET Home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page of None' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Login Fail page. */
router.get('/loginfail', function(req, res) {
    res.render('loginfail', { title: 'Authentication Failure!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
	
    collection.find({},{},function(e, docs){
        res.render('userlist', {
            "userlist" : docs,
			title: 'The User List'
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* GET Valid User page. */
router.get('/validuser', function(req, res) {
    res.render('checkuser', { title: 'Valid User Confirmation' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userPass = req.body.userpass;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "user" : userName,
        "pass" : userPass
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem inserting into the database!");
        } else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

/* POST to Validate User Service */
router.post('/validuser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userPass = req.body.userpass;

    // Set our collection
    var collection = db.get('usercollection');
	// Passport prolly should go here instead...
    collection.find({user: userName, pass: userPass}, {}, function(e, docs){
		if (e != null || (docs != null && docs.length < 1)){
			// Search failed
			//res.send("Credentials could not be validated!");
			res.redirect("loginfail");
		} else {
			res.render('checkuser', {
				"validlist" : docs,
				title: 'The Valid List'
			});
		}
    });
});


module.exports = router;

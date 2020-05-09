//EXPORTS
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../Models/users');

//GET REQUESTS
router.get('/', function (req, res) {
    res.render('index');
});

router.get('/home', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});


router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/home')
})

//POST ROUTES
router.post('/register', function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, User) {
        if (err) {
            console.log(err);
            res.render('register');
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect('/home')
        })
    })
})

router.post('/login', passport.authenticate("local", {
    successRedirect: '/home',
    failureRedirect: '/login'
}), function (req, res) {})


//CHECK FUNCTION
function isLoggenIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}

//EXPORTS
module.exports = router;
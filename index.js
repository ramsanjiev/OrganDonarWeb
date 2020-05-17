//REQUIRE FILES
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var method = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var donator = require('./Models/donorModel');
var User = require('./Models/users');
var IndexRoute = require('./routes/index');
var DonorRoutes = require('./routes/donor');
var { body } = require('express-validator');


const PORT = process.env.PORT || 3000 || config.httpPort;

//CONFIG FILE
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/Public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(method('_method'));

//PASSPORT CONFIG
app.use(require('express-session')({
    secret: "YoU CanT BreaK ThE DecodE SincE IT is DefineD BY MyselF",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

//GLOBAL CONFIG
app.use(function (req, res, next) {
    res.locals.CurrentUser = req.user;
    next();
})

//ROUTES CONGFIG
app.use(DonorRoutes);
app.use(IndexRoute);


//DATABASE CONFIG
mongoose.set('useFindAndModify', false);
var mongoDB = 'mongodb://heroku_pm1swcgs:km4ldc7povnuji4g36j511b4eg@ds137220.mlab.com:37220/heroku_pm1swcgs';
mongoose.connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});




//SETUP LISTENER
app.listen(PORT, () => console.log(`App Server is Started`));
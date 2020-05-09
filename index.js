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

//SETUP PORT
var port = 25298;

//CONFIG FILE
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
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
var mongoDB = 'mongodb+srv://ramsanjiev:ramsanjiev@cluster0-aqo82.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});




//SETUP LISTENER
app.listen(port, () => console.log(`App Server is Started`));
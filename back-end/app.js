var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var cors = require('cors');

// Models
var User = require('./models/User');
// Routes
var indexRouter = require('./routes/index');

var app = express();

//Module configurations
mongoose.connect('mongodb://localhost/web_coding_challenge', { useNewUrlParser: true });
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Passport configuration
app.use(expressSession({
    secret: 'united-remote',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Main routes
app.use('/api/v1/', indexRouter);


module.exports = app;

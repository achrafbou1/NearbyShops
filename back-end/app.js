const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');

// Models
const User = require('./models/User');
// Routes
const indexRouter = require('./routes/index');
const shopsRouter = require('./routes/shops');

const app = express();

// Module configurations
mongoose.connect('mongodb://localhost/united-remote-web-challenge', {
  useNewUrlParser: true,
});
app.use(logger('dev'));
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Passport configuration
app.use(expressSession({
  secret: 'united-remote',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Main routes
app.use('/api/v1/', indexRouter);
app.use('/api/v1/shops/', shopsRouter);

module.exports = app;

const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

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
app.use(passport.initialize());
app.use(passport.session());

// Main routes
app.use('/api/v1/', indexRouter);
app.use('/api/v1/shops/', shopsRouter);

module.exports = app;

// Config imports

// Module imports

const passport = require('passport');
require('../config/passport')(passport);
const express = require('express');
const nodeInputValidator = require('node-input-validator');
const jwt = require('jsonwebtoken');
const settings = require('../config/settings');


// Models
const User = require('../models/User');

// Initialization of modules
const router = express.Router();


/* Auth Routes */
router.post('/register', (req, res) => {
  checkInput(req, res);
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });
  newUser.save((err) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Username already exists.',
      });
    }
    res.json({
      success: true,
      message: 'Successful created new user.',
    });
  });
});


router.post('/login', (req, res) => {
  checkInput(req, res);
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).send({
        success: false,
        error: {
          message: 'Authentication failed. User not found.',
        },
      });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign(user.toJSON(), settings.secret);
          // return the information including token as JSON
          res.json({
            success: true,
            token: `JWT ${token}`,
          });
        } else {
          res.status(401).send({
            success: false,
            error: {
              message: 'Authentication failed. Wrong password.'
            },
          });
        }
      });
    }
  });
});

// Functions

checkInput = (req, res) => {
  const validator = new nodeInputValidator(req.body, {
    username: 'required|email',
    password: 'required|min:8',
  });

  validator.check().then((matched) => {
    if (!matched) {
      console.log(validator.errors);
      const emailError = validator.errors.username ? `${validator.errors.username.message}\n` : '';
      const passwordError = validator.errors.password ? validator.errors.password.message : '';
      return res.status(422).json({
        error: {
          success: false,
          message: emailError.concat(passwordError),
        },
      });
    }
  });
};


module.exports = router;
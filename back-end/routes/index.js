// Module imports
const passport = require('passport');
const express = require('express');
const nodeInputValidator = require('node-input-validator');

// Models
const User = require('../models/User');

// Initialization of modules
const router = express.Router();


/* Auth Routes */
router.post('/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
  });
  checkInput(req, res);
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(422).json({
        error: err,
      });
    }
    passport.authenticate('local')(req, res, () => res.status(200).json({ user }));
  });
});


router.post('/login', (req, res, next) => {
  checkInput(req, res);
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.status(401).json({ error: info }); }
    req.logIn(user, (err) => {
      if (err) { return res.status(401).json({ error: info }); }
      return res.json({ user: user.username });
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({message: 'Successfully logged out'});
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
        error: { message: emailError.concat(passwordError) },
      });
    }
  });
};


module.exports = router;

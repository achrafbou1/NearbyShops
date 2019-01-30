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
  const validator = new nodeInputValidator(req.body, {
    username: 'required|email',
    password: 'required|min:8',
  });

  const newUser = new User({
    username: req.body.username,
  });

  validator.check().then((matched) => {
    if (!matched) {
      console.log(validator.errors);
      const emailError = validator.errors.username ? `${validator.errors.username.message}\n` : '';
      const passwordError = validator.errors.password ? validator.errors.password.message : '';
      return res.status(422).json({
        error: emailError.concat(passwordError),
      });
    }
    User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(422).json({
          error: err.message,
        });
      }
      passport.authenticate('local')(req, res, () => res.send(200));
    });
  });
});


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.status(401).json({ error: 'Your email or password is incorrect, please try again' }); }
    req.logIn(user, (err) => {
      if (err) { return res.status(401).json({ error: 'Your email or password is incorrect, please try again' }); }
      return res.json({ user: user.username });
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send('Sucessfully logged out');
});

module.exports = router;

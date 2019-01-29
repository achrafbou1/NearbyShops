// Module imports
var passport = require("passport");
var express = require('express');
var nodeInputValidator = require('node-input-validator');

// Models
var User = require('../models/User');

//Initialization of modules
var router = express.Router();


/* Auth Routes */
router.post('/register', (req, res, next) => {
    let validator = new nodeInputValidator(req.body, {
        username: 'required|email',
        password: 'required|min:8'
    });

    let newUser = new User({
        username: req.body.username
    });

    validator.check().then(matched => {
        if (!matched) {
            console.log(validator.errors);
            let emailError = validator.errors.username ? validator.errors.username.message + '\n' : '';
            let passwordError = validator.errors.password ? validator.errors.password.message : '';
            return res.status(422).json({
                error: emailError.concat(passwordError)
            });
        }
        User.register(newUser, req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(422).json({
                    error: err.message
                });
            }
            passport.authenticate('local')(req, res, function () {
                return res.send(200);
            });
        });
    });

});

router.get("/login", function (req, res) {
    res.send('Please login again');
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: 'shops',
        failureRedirect: 'login'
    })
);

router.get("/logout", (req, res) => {
    req.logout();
    res.send('sucessfully logged out');
});

router.get("/shops", (req, res) => {
    res.send('Successfully logged in');
}, (req, res) => {
    let token = getToken(req.headers);
    if (token) {
        console.log('Authenticated' + req.headers);
        res.json({user: 'Authenticated' + req.headers})
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'})
    }
});

module.exports = router;
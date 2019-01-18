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
        email:'required|email',
        password: 'required|min:8'
    });

    let newUser = new User({
        username: req.body.email
    });

    validator.check().then(matched => {
        if (!matched) {
            let emailError =  validator.errors.email ? validator.errors.email.message + '\n' : '';
            let passwordError = validator.errors.password ? validator.errors.password.message : '';
            return res.status(422).json({error: emailError.concat(passwordError)});
        }
        User.register(newUser, req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(422).json({error: err.message});
            }
            return res.status(200);
                             
        });
    });
    
});

// router.post("/login", passport.authenticate("local", {
//     successRedirect: "http://localhost:8080/shops",
//     failureRedirect: "http://localhost:8080/login"
// }), (req, res) => {console.log(req.body)});

module.exports = router;
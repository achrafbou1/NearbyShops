const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
    username: {type: String, unique: true, required: true},
    password: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
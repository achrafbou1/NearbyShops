const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const settings = require('../config/settings');

// Models
const User = require('../models/User');


module.exports = function (passport) {

  // Options
  const opts = {
    secretOrKey: settings.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
  };

  passport.use(new JwtStrategy(opts, ((jwtPayload, done) => {
    User.findOne({
      id: jwtPayload.id,
    }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  })));
};

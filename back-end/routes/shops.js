// Module imports
const passport = require('passport');
require('../config/passport')(passport);
const express = require('express');

const router = express.Router();

// Models
const Shop = require('../models/Shop');

/* GET shops listing. */
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    Shop.find((err, shops) => {
      if (err) console.log(err);
      res.json({shops});
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'Unauthorized.'
    });
  }
});

// Functions

let getToken = function (headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
    return null;
  }
  return null;
};

module.exports = router;
// Module imports
const passport = require('passport');
require('../config/passport')(passport);
const express = require('express');

const router = express.Router();

// Models
const Shop = require('../models/Shop');
const User = require('../models/User');

/* GET shops listing. */
router.get('/', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    Shop.find((err, shops) => {
      if (err) console.log(err);
      res.json({
        shops,
      });
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'Unauthorized.',
    });
  }
});

/* GET liked shops listing. */
router.get('/likedshops', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    User.find({
      _id: req.user._id,
    },(err, user) => {
      if (err) console.log(err);
      console.log()
      res.json({
        likedShops: user[0].likedShops,
      });
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'Unauthorized.',
    });
  }
});

// Like a shop
router.post('/like', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  console.log(req.body.shop_id);
  User.findOneAndUpdate({
    _id: req.user._id,
  }, {
    $push: {
      likedShops: req.body.shop_id,
    },
  }, {
    new: true,
  }, (err, doc) => {
    if (err) {
      res.status(422).send({
        success: false,
        message: err,
      });
    } else {
      res.status(200).send({
        success: true,
        user: req.user.username,
        likedShops: doc.likedShops,
      });
    }
  });
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

const express = require('express');
const middleware = require('../middleware');

const router = express.Router();

//Models
const Shop = require('../models/Shop');

/* GET shops listing. */
router.get('/', middleware.isLoggedIn, (req, res) => {
  Shop.find((err, res) => {
    if (err) {
      res.json({
        error: {
          message: err
        }
      });
    } else {
      console.log(res);
    }
  });
  res.send('Successfully logged in');
});

module.exports = router;
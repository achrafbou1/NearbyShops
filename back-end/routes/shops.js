const express = require('express');
const middleware = require('../middleware');

const router = express.Router();

//Models
const Shop = require('../models/Shop');

/* GET shops listing. */
router.get('/', middleware.isLoggedIn, (req, res) => {
  Shop.find((err, shops) => {
    if (err) {
      res.json({
        error: {
          message: err
        }
      });
    } else {
      res.json({
        shops
      })
    }
  });
});

module.exports = router;
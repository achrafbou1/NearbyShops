const express = require('express');
const middleware = require('../middleware');

const router = express.Router();


/* GET users listing. */
router.get('/', middleware.isLoggedIn, (req, res) => {
  res.send('Successfully logged in');
});

module.exports = router;

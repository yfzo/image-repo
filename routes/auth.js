const express = require('express');
const router = express.Router();

/* Login */
router.post('/', function(req, res, next) {
  res.send('logged in');
});

module.exports = router;

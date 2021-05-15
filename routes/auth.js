const express = require('express');
const router = express.Router();

const {
  loginUser,
  registerUser
} = require('../controllers/auth');

router.get('/login', function(req, res, next) {
  res.send('login');
});

router.post('/login', loginUser);

router.post('/logout', function(req, res, next) {
  res.send('logged out');
});

router.get('/register', function(req, res, next) {
  res.send('register');
});

router.post('/register', registerUser);


module.exports = router;

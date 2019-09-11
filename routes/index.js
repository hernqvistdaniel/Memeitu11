const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET HOMEPAGE
router.get('/', (req, res, next) => {
  res.render('index', { title: 'MemeIt!' });
});

// GET LOGIN SCREEN
router.get('/login', (req, res, next) => {
  res.render('login');
});

// POST LOGIN INFORMATION
router.post('/login', (req, res, next) => {
  User.authenticate(req.body.username, req.body.password, (err, user) => {
    if (err || !user) {
      const next_error = new Error('Username or Password is incorrect!');
      next_error.status = 401;

      return next(next_error);
    } else {
      req.session.userId = user._id;

      return res.redirect('/');
    }
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Comment = require('../models/Comment');

// SET LAYOUT VARIABLES
router.use(function(req, res, next) {
  res.locals.title = "MemeIt!";
  res.locals.currentUserId = req.session.userId;

  next();
});

// GET HOMEPAGE
router.get('/', (req, res, next) => {
    User.findById({ _id: req.session.userId }, function(err, user) {
      if (err) {
        console.error(err);
      }
      res.render('index', { user: user });
    }); 
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



// LOGOUT
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) return next(err);
    });
  }

  return res.redirect('/login');
});

module.exports = router;

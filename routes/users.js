const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('./helpers/auth');

// USERS get all
router.get('/', auth.requireLogin, (req, res, next) => {
  User.find({}, 'username', (err, users) => {
    if (err) {
      console.log(`Couldn't find any users ${err}`);
    } else {
      res.render('users/index', { users: users });
    }
  });
}); 

// USERS new
router.get('/new', (req, res, next) => {
  res.render('users/new');
});

// USERS create new
router.post('/', (req, res, next) => {
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) console.log(`There was a problem creating a new user: ${err}`);
    return res.redirect('/users');
  });
});

module.exports = router;
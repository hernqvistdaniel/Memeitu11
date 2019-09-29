const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('./helpers/auth');
const User = require('../models/User');

// GET HOMEPAGE
router.get('/', auth.requireLogin, async (req, res, next) => {
  try {
    user = await User.findById({ _id: req.session.userId });
    users = await User.find({});
  } catch (err) {
    console.error(err);
  }
  res.render('admin', { user: user, users: users });
});

// ADMIN USER DELETE USER
router.post('/:id/delete', auth.requireLogin, async (req, res, next) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.id });
    const user = await User.findById(req.session.userId);
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
  }
});

// ADMIN MODIFYING USER
router.post('/:id/mod', auth.requireLogin, async (req, res, next) => {
  try {
    const clickedUser = await User.findById(req.params.id);
    const mod = !clickedUser.isMod;
    await User.findByIdAndUpdate(req.params.id, {
      isMod: mod
    });
  } catch (err) {
    console.error(err);
  }
  res.redirect('/admin');
});

module.exports = router;

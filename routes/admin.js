const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('./helpers/auth');
const User = require('../models/User');

// GET HOMEPAGE
router.get('/', auth.requireLogin, async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.session.userId });
    const users = await User.find({});

    res.render('admin', { user: user, users: users });
  } catch (err) {
    console.error(err);
  }
});

// ADMIN USER DELETE USER
router.post('/:id/delete', auth.requireLogin, async (req, res, next) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.id });

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

    res.redirect('/admin');
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("./helpers/auth");
const Room = require("../models/Room");
const Post = require("../models/Post");
const User = require("../models/User");
const commentsRouter = require("./comments");
const moment = require('moment');

// GET HOMEPAGE
router.get('/', auth.requireLogin, (req, res, next) => {
    User.findById({ _id: req.session.userId }, function(err, user) {
      if (err) {
        console.error(err);
      }
      User.find({}, "username", (err, users) => {
        if (err) {
          console.log(`Couldn't find any users ${err}`);
        }
    res.render('admin', { user: user, users: users });
    });
  });
});

module.exports = router;
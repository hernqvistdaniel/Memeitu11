const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("./helpers/auth");
const moment = require('moment');

// USERS get all
router.get("/", auth.requireLogin, (req, res, next) => {
  User.find({}, "username", (err, users) => {
    if (err) {
      console.log(`Couldn't find any users ${err}`);
    } else {
      res.render("users/index", { users: users });
    }
  });
});

// USERS new
router.get("/new", (req, res, next) => {
  res.render("users/new");
});

// PROFILE VIEW
router.get("/profile", auth.requireLogin, (req, res, next) => {
  User.findById({ _id: req.session.userId }, function(err, user) {
    if (err) {
      console.error(err);
    }
    res.render("users/profile", { user: user });
  });
});

// PROFILE EDIT VIEW
router.get("/profile-edit", auth.requireLogin, (req, res, next) => {
  User.findById({ _id: req.session.userId }, function(err, user) {
    if (err) {
      console.error(err);
    }
    res.render("users/profile-edit", { user: user });
  });
});

// PROFILE EDIT SAVE
router.post("/profile-edit", auth.requireLogin, (req, res, next) => {
  User.findByIdAndUpdate({ _id: req.session.userId }, req.body, function(
    err,
    user
  ) {
    if (err) {
      console.error(err);
    }
    res.redirect("/users/profile/");
  });
});

// USERS create new
router.post("/", (req, res, next) => {
  const user = new User(req.body);

  time = moment().format("MMMM Do YYYY, HH:mm:ss a");
  user.createdAt = time.substr(0, 26);

  user.save((err, user) => {
    if (err) console.log(`There was a problem creating a new user: ${err}`);
    return res.redirect("/login");
  });
});

module.exports = router;

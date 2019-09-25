const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("./helpers/auth");
const moment = require("moment");
const Comment = require("../models/Comment");
const Post = require('../models/Post');

// USERS new
router.get("/new", (req, res, next) => {
  res.render("users/new");
});

// PROFILE VIEW
router.get("/profile", auth.requireLogin, (req, res, next) => {
  User.findById({ _id: req.session.userId }, function(err, user) {
    Comment.find({ author: req.session.userId }, function(err, comments) {
      Post.find({ author: req.session.userId }, function(err, posts) {
        if (err) {
          console.error(err);
        }
        res.render("users/profile", { user: user, comments: comments, posts: posts });
      });
    });
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

// DELETE
router.post("/profile-delete", auth.requireLogin, (req, res, next) => {
  User.findById({ _id: req.session.userId }, function(err, user) {
    if (err) {
      console.error(err);
    }
    if (req.body.userDelete === user.username) {
      User.findByIdAndDelete({ _id: req.session.userId }, function(err, user) {
        if (err) {
          console.error(err);
        }
        res.redirect("/logout");
      });
    } else {
      res.redirect("/profile-edit");
    }
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

// FIRST TIME WELCOME DISPLAY

router.get("/welcome", (req, res, next) => {
  res.render("users/welcome");
});

// USERS create new
router.post("/new", async (req, res, next) => {
  const isDouble = await User.findOne({ username: req.body.username });
  if (isDouble) {
    const usernameTaken = "That username is already taken, try another one!";
    res.render("users/new", { usernameTaken: usernameTaken });
  } else {
    const user = new User(req.body);

    time = moment().format("MMMM Do YYYY, HH:mm:ss a");
    user.createdAt = time.substr(0, 26);

    user.save((err, user) => {
      if (err) console.log(`There was a problem creating a new user: ${err}`);
    });
    res.redirect("welcome");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("./helpers/auth");
const Room = require("../models/Room");
const Post = require("../models/Post");
const User = require("../models/User");
const moment = require("moment");

const commentsRouter = require("./comments");

// NEW POST
router.get("/new", auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.roomId, function(err, room) {
    if (err) {
      console.error(err);
    }

    res.render("posts/new", { room: room });
  });
});

// GET SPECIFIC POSTS
router.get("/show/:id", auth.requireLogin, (req, res, next) => {
  User.findById({ _id: req.session.userId }, function(err, user) {
    if (err) {
      console.error(err);
    }
    Post.findById(req.params.id)
      .populate("comments")
      .exec(function(err, post) {
        if (err) {
          console.error(err);
        }

        res.render("posts/show", {
          post: post,
          user: user
        });
      });
  });
});

// CREATE POST
router.post("/", auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.roomId, function(err, room) {
    if (err) {
      console.error(err);
    }
    User.findById({ _id: req.session.userId }, function(err, user) {
      if (err) {
        console.error(err);
      }
      let post = new Post(req.body);
      post.author = user.username;
      post.authorPic = user.picLink;
      post.room = room;

      time = moment().format("MMMM Do YYYY, HH:mm:ss a");
      post.createdAt = time.substr(0, 26);

      post.save(function(err, post) {
        if (err) {
          console.error(err);
        }

          return res.redirect(`/rooms/${room._id}`);
        });
      });
  });
});

// UPDATE POST FORM
router.get("/:id/edit", auth.requireLogin, (req, res, next) => {
  Post.findById(req.params.id, function(err, post) {
    res.render("posts/edit", { post: post });
  });
});

// UPDATE POST BODY
router.post("/:id/edit", auth.requireLogin, (req, res, next) => {
  Post.findByIdAndUpdate({ _id: req.params.id }, req.body, function(err, post) {
    return res.redirect(`/rooms/${post.roomId}/posts/show/${req.params.id}`);
  });
});

// DELETE POST
router.post("/show/:id/delete", auth.requireLogin, (req, res, next) => {
  Post.findByIdAndDelete(req.params.id, function(err, post) {
    if (err) {
      console.error(err);
    }
    return res.redirect(`/rooms/${req.params.roomId}`);
  });
});

// UPDATE POST POINTS
router.post("/:id", auth.requireLogin, (req, res, next) => {
  Post.findById(req.params.id, function(err, post) {
    post.points += parseInt(req.body.points);
    post.usersVoted.push(req.session.userId);

    post.save(function(err, post) {
      if (err) {
        console.error(err);
      }

      return res.redirect(`/rooms/${post.room}/posts/show/${req.params.id}`);
    });
  });
});

router.use("/:postId/comments", commentsRouter);

module.exports = router;

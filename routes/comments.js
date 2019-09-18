const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("./helpers/auth");
const Room = require("../models/Room");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const moment = require('moment');

// NEW COMMENT
router.get("/new", auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.roomId, function(err, room) {
    if (err) {
      console.error(err);
    }

    Post.findById(req.params.postId, function(err, post) {
      if (err) {
        console.error(err);
      }

      res.render("comments/new", { post: post, room: room });
    });
  });
});

router.post("/", auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.roomId, function(err, room) {
    if (err) {
      console.error(err);
    }

    Post.findById(req.params.postId, function(err, post) {
      if (err) {
        console.error(err);
      }

      User.findById({ _id: req.session.userId }, function(err, user) {
        if (err) {
          console.error(err);
        }

        let comment = new Comment(req.body);
        post.comments.push(comment);
        comment.author = user.username;
        comment.authorPic = user.picLink;

        post.save(function(err, post) {
          if (err) {
            console.error(err);
          }
          time = moment().format('MMMM Do YYYY, HH:mm:ss a');
          comment.createdAt = time.substr(0, 26);

          comment.save(function(err, comment) {
            if (err) {
              console.error(err);
            }

            return res.redirect(`/rooms/${req.params.roomId}/posts/show/${req.params.postId}`);
          });
        });
      });
    });
  });
});

module.exports = router;

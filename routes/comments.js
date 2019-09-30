const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('./helpers/auth');
const Room = require('../models/Room');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const moment = require('moment');

// NEW COMMENT
router.get('/new', auth.requireLogin, async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomId);
    const post = await Post.findById(req.params.postId);

    res.render('comments/new', { post: post, room: room });
  } catch (err) {
    console.error(err);
  }
});

// SAVE COMMENT
router.post('/', auth.requireLogin, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    const user = await User.findById({ _id: req.session.userId });

    let comment = new Comment(req.body);
    post.comments.push(comment);
    comment.authorPic = user.picLink;
    comment.author = user;

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
        return res.redirect(
          `/rooms/${req.params.roomId}/posts/show/${req.params.postId}`
        );
      });
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;

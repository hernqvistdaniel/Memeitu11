const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('./helpers/auth');
const Room = require('../models/Room');
const Post = require('../models/Post');

// NEW POST
router.get('/new', auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.roomId, function(err, room) {
    if(err) { console.error(err) };

    res.render('posts/new', { room: room });
  });
});

// CREATE POST
router.post('/', auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.roomId, function(err, room) {
    if(err) { console.error(err) };

    let post = new Post(req.body);
    post.room = room;

    post.save(function(err, post) {
      if(err) { console.error(err) };

      return res.redirect(`/rooms/${room._id}`);
    });
  });
});

router.use('/:postId/comments', commentsRouter);

module.exports = router;
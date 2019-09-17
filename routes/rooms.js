const express = require('express');
const router = express.Router();

const auth = require('./helpers/auth');
const Room = require('../models/Room');
const Post = require('../models/Post');

// REQUIRE FOR NESTING <--
const posts = require('./posts');

// INDEX ROOMS
router.get('/', auth.requireLogin, (req, res, next) => {
  Room.find({}, 'topic', function(err, rooms) {
    Post.find({ room: rooms }).populate('posts').sort({ points: -1 }).exec(function(err, posts) {

      res.render('rooms/index', { rooms: rooms, posts: posts });
  });
  });
});

// NEW ROOM FORM
router.get('/new', auth.requireLogin, (req, res, next) => {
  res.render('rooms/new');
});

// SHOW SPECIFIC ROOM
router.get('/:id', auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.id, function(err, room) {
    if(err) { res.render('rooms/noroom') };

    Post.find({ room: room }).sort({ points: -1 }).populate('comments').exec(function(err, posts) {
      if(err) { console.error(err) };

      res.render('rooms/show', { room: room, posts: posts, roomId: req.params.id });
    });
  });
});

// EDIT ROOM
router.get('/:id/edit', auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.id, function(err, room) {
    if(err) { res.render('rooms/noroom') };

    res.render('rooms/edit', { room: room });
  });
});

// UPDATE ROOM
router.post('/:id', auth.requireLogin, (req, res, next) => {
  Room.findByIdAndUpdate(req.params.id, req.body, function(err, room) {
    if(err) { res.render('rooms/noroom') };

    res.redirect('/rooms/');
  });
});

// CREATE ROOM
router.post('/', auth.requireLogin, (req, res, next) => {
  let room = new Room(req.body);

  room.save(function(err, room) {
    if(err) {
      console.error(err);
    };
    return res.redirect('/rooms');
  });
});

// NEST HERE <--
router.use('/:roomId/posts', posts);

module.exports = router;
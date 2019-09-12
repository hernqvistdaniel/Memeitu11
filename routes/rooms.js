const express = require('express');
const router = express.Router();

const auth = require('./helpers/auth');
const Room = require('../models/Room');

// INDEX ROOMS
router.get('/', (req, res, next) => {
  Room.find({}, 'topic', function(err, rooms) {
    if(err) {
      console.error(err);
    } else {
      res.render('rooms/index', { rooms: rooms });
    }
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

    res.render('rooms/show', { room: room });
  });
});

// EDIT ROOM
router.get('/:id/edit', auth.requireLogin, (req, res, next) => {
  // IMPLEMENT
});

// UPDATE ROOM
router.post('/:id', auth.requireLogin, (req, res, next) => {
  // IMPLEMENT
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

module.exports = router;
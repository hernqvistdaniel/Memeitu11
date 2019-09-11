const express = require('express');
const router = express.Router();

const auth = require('./helpers/auth');
const Room = require('../models/Room');

// INDEX ROOMS
router.get('/', (req, res, next) => {
  // IMPLEMENT
});

// NEW ROOM FORM
router.get('/new', auth.requireLogin, (req, res, next) => {
  res.render('rooms/new');
});

// SHOW SPECIFIC ROOM
router.get('/:id', auth.requireLogin, (req, res, next) => {
  // IMPLEMENT
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
  //IMPLEMENT
});
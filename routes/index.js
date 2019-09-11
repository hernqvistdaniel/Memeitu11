const express = require('express');
const router = express.Router();

// GET HOMEPAGE
router.get('/', (req, res, next) => {
  res.render('index', { title: 'MemeIt!' });
});

// LOGIN
router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  console.log('Logging in...');
  console.log(req.body);

  res.redirect('/');
});

module.exports = router;

const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

router.post('/register', (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      passport.authenticate('local')(req, res, () => {
        res.send('Registered');
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Logged in');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.send('Logged out');
  });

module.exports = router;

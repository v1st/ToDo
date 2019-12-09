const express = require('express');
const router = express.Router();

const User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Task.io'
  });
});

/* GET signup page. */
router.get('/signup', function (req, res, next) {
  res.render('signup', {
    title: 'Task.io'
  });
});

/* POST signup page. */
router.post('/signup', function (req, res, next) {
  const {
    email,
    username,
    password,
    passwordConfirm
  } = req.body;

  // Confirm that user typed same password twice
  if (password !== passwordConfirm) {
    const err = new Error('Passwords do not match.');
    err.status = 400;
    return next(err);
  }

  // Send POST data to user collection
  if (email &&
    username &&
    password &&
    passwordConfirm) {
    const userData = {
      email: email,
      username: username,
      password: password,
    }
    // Use schema.create to insert data into the db
    User.create(userData, (err, user) => {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/');
      }
    });
  } else {
    const err = new Error('All fields have to be filled out');

    err.status = 400;
    return next(err);
  }
});

module.exports = router;
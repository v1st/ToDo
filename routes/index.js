const express = require('express');
const router = express.Router();
const passport = require('passport');


const User = require('../models/User');

/* GET /
  Home Page
*/
router.get('/', function (req, res, next) {
  res.render('index', {
    data: {},
    user: req.user
  });
});

/* GET /signup
  Signup page. 
*/
router.get('/signup', function (req, res, next) {
  res.render('signup', {
    title: 'Task.io',
    data: {}
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
    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    const err = new Error('All fields have to be filled out');

    err.status = 400;
    return next(err);
  }
});


// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        return res.json({
          username: user.username,
          email: user.email,
        });
      }
    });
});


// GET login page
router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'Task.io',
    data: {}
  });
});

// POST Login page
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/');
  });


// GET Logout
router.get('/logout',
  function (req, res) {
    req.logout();
    res.redirect('/');
  });


module.exports = router;
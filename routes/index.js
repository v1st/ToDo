const express = require('express');
const router = express.Router();

const User = require('../models/User');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    data: {
      
    }
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
    isLoggedIn: true
  });
});

// POST Login page
router.post('/login', function (req, res, next) {
  const {
    loginEmail,
    loginPassword
  } = req.body;

  if (loginEmail && loginPassword) {
    User.authenticate(loginEmail, loginPassword, function (err, user) {
      if (err || !user) {
        let error = new Error('Wrong email or password.');
        error.status = 401;
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  }
});

// GET Logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
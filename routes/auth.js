const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

/**
 * GET /signup
 * Signup page
 */
router.get('/signup', function (req, res, next) {
  res.render('signup', {
    data: {
      title: 'Signup',
    }
  });
});

/**
 * POST /signup
 * Register new user
 */
router.post('/signup', function (req, res, next) {
  const {
    email,
    username,
    password,
    passwordConfirm
  } = req.body;

  // Confirm that user typed same password twice
  if (password !== passwordConfirm) {
    res.status(400)
      .render('signup', {
        data: {
          title: 'Signup',
          warning: "Passwords do not match!"
        }
      });
  }

  // Send POST data to user collection
  if (email &&
    username &&
    password &&
    passwordConfirm) {
    const startingProjectsData = [{
      name: 'Todo List',
      lists: [{
          name: 'Tasks',
          todos: [{
            content: 'New Task',
            isCompleted: false
          }]
        },
        {
          name: 'In Progress',
          todos: [{
            content: 'New Task',
            isCompleted: false
          }]
        },
        {
          name: 'Done',
          todos: [{
            content: 'New Task',
            isCompleted: false
          }]
        },
      ]
    }]

    const userData = {
      email: email,
      username: username,
      password: password,
      projects: [...startingProjectsData],
    }

    // Check if user or email is already taken
    User.findOne({
      $or: [{
        username
      }, {
        email
      }]
    }, function (err, found) {
      if (err) {
        return next(error);
      }
      if (found) {
        res.status(400)
          .render('signup', {
            data: {
              title: 'Signup',
              warning: "Email or Username is already taken."
            }
          });
      }
    });

    // Use schema.create to insert data into the db
    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.redirect('/dashboard');
        });
      }
    });
  } else {
    res.status(400)
      .render('signup', {
        data: {
          title: 'Signup',
          warning: "All fields need to be filled."
        }
      });
  }
});

/**
 * GET /login
 * Login page
 */
router.get('/login', function (req, res, next) {
  res.render('login', {
    data: {
      title: 'Login',
    }
  });
});

/**
 * POST /login
 * Login to user account
 */
router.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    req.session.save(function () {
      return res.redirect('/dashboard');
    });
  });


/**
 * GET /logout
 * Logout user and destroy session data
 */
router.get('/logout',
  function (req, res) {
    req.logout();
    req.session.destroy(function (err) {
      res.redirect('/');
    });
  });

module.exports = router;
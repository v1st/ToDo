const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

/**
 * GET /dashboard
 * User's dashboard page
 */
router.get('/', isLoggedIn, function (req, res) {
  res.render('dashboard', {
    data: {},
    user: req.user
  }); 
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect them to the login page
  res.redirect('/login');
}

module.exports = router;
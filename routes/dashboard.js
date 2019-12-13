const express = require('express');
const router = express.Router();
const passport = require('passport');

/**
 * GET /dashboard
 * User's dashboard page
 */
router.get('/', isLoggedIn, function (req, res) {
  res.render('dashboard', {
    data: {},
    user: req.user
  });
  // User.findById(req.session.userId)
  //   .exec(function (error, user) {
  //     if (error) {
  //       return next(error);
  //     } else {
  //       return res.render('dashboard', {
  //         user: req.user
  //       });
  //     }
  //   });
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/login');
}


module.exports = router;

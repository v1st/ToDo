const express = require('express');
const router = express.Router();

/**
 * GET /dashboard
 * User's dashboard page
 */
router.get('/dashboard', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        return res.render('dashboard');
      }
    });
});

module.exports = router;

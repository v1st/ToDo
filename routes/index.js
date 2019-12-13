const express = require('express');
const router = express.Router();

/**
 * GET /
 * Home page
 */
router.get('/', function (req, res, next) {
  res.render('index', {
    data: {},
    user: req.user
  });
});

module.exports = router;
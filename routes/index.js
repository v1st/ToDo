var express = require('express');
var router = express.Router();

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
  res.send(req.body)
});

module.exports = router;
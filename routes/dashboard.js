const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/User');
const Todo = require('../models/Todo');

/**
 * GET /dashboard
 * User's dashboard page
 */
router.get('/', isLoggedIn, function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

/**
 * GET /dashboard/state
 * User's initial state data
 */
router.get('/state', isLoggedIn, function (req, res) {
  res.json({
    projects: req.user.projects
  });
});

/**
 * POST /dashboard/state
 * Add todo to databse
 */
router.post('/state', isLoggedIn, function (req, res) {
  const newItem = new Todo({
    content: 'New Task',
    isCompleted: false
  });
  const projectID = req.body.project._id;
  const listID = req.body.list._id;

  User.findOne({
    username: req.user.username
  }, function (err, data) {
    if (err) console.log(err);

    data.projects.id(projectID).lists.id(listID).todos.unshift(newItem);
    data.save();
  })

  res.end();
});

/**
 * PUT /dashboard/state
 * Update todo in databse
 */
router.put('/state/:id', isLoggedIn, function (req, res) {
  const projectID = req.body.project._id;
  const listID = req.body.list._id;
  const todoID = req.body.todo._id;
  const newContent = req.body.newContent;

  User.findOne({
    username: req.user.username
  }, function (err, data) {
    if (err) console.log(err);

    data.projects.id(projectID).lists.id(listID).todos.id(todoID).content = newContent;
    data.save();
  })

  res.end();
});

/**
 * DELETE /dashboard/state
 * Add todo to databse
 */
router.delete('/state/:id', isLoggedIn, function (req, res) {
  const projectID = req.body.project._id;
  const listID = req.body.list._id;
  const todoID = req.body.todo._id;

  User.findOne({
    username: req.user.username
  }, function (err, data) {
    if (err) console.log(err);

    data.projects.id(projectID).lists.id(listID).todos.id(todoID).remove();
    data.save();
  })

  res.end();
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
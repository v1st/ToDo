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
        title: 'Task.io',
        data: {}
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
                return res.redirect('/dashboard');
            }
        });
    } else {
        const err = new Error('All fields have to be filled out');

        err.status = 400;
        return next(err);
    }
});


/**
 * GET /login
 * Login page
 */
router.get('/login', function (req, res, next) {
    res.render('login', {
        title: 'Task.io',
        data: {}
    });
});

/**
 * POST /login
 * Login to user account
 */
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })
);


/**
 * GET /logout
 * Logout user and destroy session data
 */
router.get('/logout',
    function (req, res) {
        req.logout();
        res.redirect('/');
    });


module.exports = router;
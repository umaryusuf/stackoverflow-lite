const express = require('express');
const passport = require('passport');
const Authentication = require('../../controllers/authentication');

const router = express.Router();
const requireSignIn = passport.authenticate('local', { session: false });

// POST - sign up route
router.post('/signup', Authentication.signup);

// POST - login route
router.post('/login', requireSignIn, Authentication.signin);

module.exports = router;

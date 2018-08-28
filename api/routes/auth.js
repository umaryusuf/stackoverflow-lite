import express from 'express';
import passport from 'passport';
import { signup, signin } from '../../controllers/authentication';

const router = express.Router();
const requireSignIn = passport.authenticate('local', { session: false });

// POST - sign up route
router.post('/signup', signup);

// POST - login route
router.post('/login', requireSignIn, signin);

export default router;

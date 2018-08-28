import passport from 'passport';
import {
  Strategy,
  ExtractJwt,
} from 'passport-jwt';
import bcrypt from 'bcrypt-nodejs';
import LocalStrategy from 'passport-local';

import config from '../config';
import { findUserById, verifyUser } from '../actions/signIn';

// create local strategy
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  verifyUser(email)
    .then((validUser) => {
      bcrypt.compare(password, validUser.password, (err, isMatch) => {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          return done(null, false);
        }

        return done(null, validUser);
      });
    })
    .catch(error => done(error));
});

// setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// create JWT strategy
const jwtlogin = new Strategy(jwtOptions, (payload, done) => findUserById(payload.sub)
  .then((foundUser) => {
    if (foundUser) {
      return done(null, foundUser);
    }
    return done(null, false);
  })
  .catch(err => done(err, false)));

// tell passport to use this strategy
passport.use(jwtlogin);
passport.use(localLogin);

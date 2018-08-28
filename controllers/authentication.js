import jwt from 'jwt-simple';
import bcrypt from 'bcrypt-nodejs';

import config from '../config';
import { createUser } from '../actions/signUp';

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

export const signin = (req, res, next) => {
  /**
   * users already have their email and pasword
   * we just need to give them a token
   */
  res.send({ token: tokenForUser(req.user) });
};


export const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(422).json({ error: 'You must provide a name, email and password' });
  }

  // generate salt for password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    // hash password
    bcrypt.hash(password, salt, null, (error, hash) => {
      if (error) {
        return next(err);
      }
      createUser(name, email, hash)
        .then((newUser) => {
          res.json({
            token: tokenForUser(newUser),
          });
        })
        .catch(() => {
          res.json({
            error: 'Error saving a user to the database',
          });
        });
    });
  });
};

export default { signin, signup };

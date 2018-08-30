import jwt from 'jwt-simple';
import bcrypt from 'bcrypt-nodejs';
import { client } from '../db';

import config from '../config';

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

export const signin = (req, res) => {
  /*
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

  // check if a user exist in the database
  const query = 'SELECT * FROM users WHERE email=$1';
  client.query(query, [email], (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser.rowCount > 0) {
      return res.status(422).json({ error: 'email is in use' });
    }

    // generate salt for password
    bcrypt.genSalt(10, (error, salt) => {
      if (err) {
        return next(error);
      }

      // hash password
      bcrypt.hash(password, salt, null, (hashError, hash) => {
        if (hashError) {
          return next(hashError);
        }
        // create a new user
        const sql = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING * ';
        client.query(sql, [name, email, hash], (insertError, newUser) => {
          if (insertError) {
            return next(insertError);
          }
          res.json({
            token: tokenForUser(newUser.rows[0]),
          });
        });
      });
    });
  });
};

export default { signin, signup };

// const { Client } = require('pg');

const initOptions = {
  // global event notification;
  error(error, e) {
    if (e.cn) {
      // A connection-related error;
      //
      // Connections are reported back with the password hashed,
      // for safe errors logging, without exposing passwords.
      console.log('CN:', e.cn);
      console.log('EVENT:', error.message || error);
    }
  },
};

const pgp = require('pg-promise')(initOptions);

const db = pgp('postgresql://umar:farooq@localhost:5432/stackoverflowlite');

// const db = new Client({
//   host: 'localhost',
//   database: 'stackoverflowlite',
//   user: 'umar',
//   password: 'farooq',
// });

// db.connect((err) => {
//   if (err) {
//     console.log('connection error', err.stack);
//   } else {
//     console.log('connected to database');
//   }
// });

db.connect()
  .then((obj) => {
    obj.done(); // success, release the connection;
    console.log('connected to database');
  })
  .catch((error) => {
    console.log('ERROR:', error.message || error);
  });

module.exports = db;

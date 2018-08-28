import db from '../db';

export const findUserById = (id) => {
  const query = `
    SELECT * FROM users WHERE id=$1
  `;
  return db.oneOrNone(query, [id]);
};

export const verifyUser = (email) => {
  const query = `
    SELECT * FROM users WHERE email=$1
  `;
  return db.oneOrNone(query, [email]);
};

export default { findUserById, verifyUser };

import db from '../db';

export const createUser = (name, email, password) => {
  const query = `
    INSERT INTO users(name, email, password)
    VALUES($1, $2, $3) RETURNING *
  `;
  return db.one(query, [name, email, password]);
};

export default { createUser };

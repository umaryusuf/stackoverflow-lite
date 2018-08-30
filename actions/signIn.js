import { client } from '../db';

export const findUserById = async (id) => {
  const query = `
    SELECT * FROM users WHERE id=$1
  `;
  const result = await client.query(query, [id]);
  return result.rowCount > 0 ? result.rows[0] : null;
};

export const verifyUser = async (email) => {
  const query = `
    SELECT * FROM users WHERE email=$1
  `;
  const res = await client.query(query, [email]);
  await client.end();
  return res.rowCount > 0 ? res.rows[0] : null;
};

export default { findUserById, verifyUser };

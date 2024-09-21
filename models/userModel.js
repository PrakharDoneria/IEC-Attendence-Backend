const pool = require('../config/db');

const getUserDataFromDb = async (userId) => {
  const result = await pool.query('SELECT id, name, role FROM users WHERE id = $1', [userId]);
  if (result.rows.length === 0) throw new Error('User not found');
  return result.rows[0];
};

module.exports = { getUserDataFromDb };

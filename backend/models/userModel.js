
const pool = require('../db/db')
const bcrypt = require('bcrypt')

const getAllUsersFromDB = async () => {
  const [users] = await pool.execute('SELECT * FROM users')
  return users
}

const insertUserIntoDB = async (username, password, role, email) => {
  const saltRounds = 10
  const hash = await bcrypt.hash(password, saltRounds)
  const [result] = await pool.execute('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, hash, role])
  return result;
}

module.exports = { getAllUsersFromDB, insertUserIntoDB }

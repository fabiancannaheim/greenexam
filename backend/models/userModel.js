
const pool = require('../db/db')
const bcrypt = require('bcrypt')

const getAllUsersFromDB = async () => {
    const [users] = await pool.execute('SELECT * FROM users')
    return users
}

const getUserByIDFromDB = async (id) => {
    const [user] = await pool.execute('SELECT * FROM users WHERE ID = ?', [id])
    return user
}

const getUserByUsernameFromDB = async (username) => {
  const [user] = await pool.execute('SELECT * FROM users WHERE username = ?', [username])
  return user
}


const insertUserIntoDB = async (username, password, role, email) => {
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    const [result] = await pool.execute('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, hash, role])
    return result
}

module.exports = { getAllUsersFromDB, insertUserIntoDB, getUserByIDFromDB, getUserByUsernameFromDB }

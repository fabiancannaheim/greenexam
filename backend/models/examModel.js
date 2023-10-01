
const pool = require('../db/db')

const getAllExamsFromDB = async () => {
  const [users] = await pool.execute('SELECT * FROM exams')
  return users
}

const insertExamIntoDB = async (title, user_id) => {
  const [result] = await pool.execute('INSERT INTO users (title, user_id) VALUES (?, ?)', [title, user_id])
  return result;
}

module.exports = { getAllExamsFromDB, insertExamIntoDB }

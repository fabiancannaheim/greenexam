
const pool = require('../db/db')

const getAllExamsFromDB = async () => {
  const [users] = await pool.execute('SELECT * FROM exams')
  return users
}

const getExamByIdFromDB = async (id) => {
  const [exam] = await pool.execute('SELECT * FROM exams WHERE ID = ?', [id])
  return exam
}

const insertExamIntoDB = async (title, user_id) => {
  const [result] = await pool.execute('INSERT INTO exams (title, user_id) VALUES (?, ?)', [title, user_id])
  return result;
}

const updateExamByIdInDB = async (id, data) => {
    
  let updateFields = []
  let values = []
  
  for (let key in data) {
      updateFields.push(`${key} = ?`) 
      values.push(data[key])
  }

  // If no valid fields are provided, exit early.
  if (updateFields.length === 0) return { message: "No valid fields provided for update." }
  
  // Construct query dynamically
  const sqlQuery = `UPDATE exams SET ${updateFields.join(", ")} WHERE id = ?`
  values.push(id)

  const [results] = await pool.execute(sqlQuery, values)
  return results
}

const deleteExamByIdInDB = async (id) => {
  const [results] = await pool.execute('DELETE FROM exams WHERE id = ?', [id]);
  return results;
}

module.exports = { getAllExamsFromDB, getExamByIdFromDB, insertExamIntoDB, updateExamByIdInDB, deleteExamByIdInDB }

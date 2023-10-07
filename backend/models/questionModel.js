
const pool = require('../db/db')

const getAllQuestionsFromDB = async () => {
  const [users] = await pool.execute('SELECT * FROM questions')
  return users
}

const getQuestionByIdFromDB = async (id) => {
  const [exam] = await pool.execute('SELECT * FROM questions WHERE ID = ?', [id])
  return exam
}

const insertQuestionIntoDB = async (title, description, skeleton, solution, points, exam_id, lang_id) => {
    const values = [title, description, skeleton, solution, points, exam_id, lang_id]
    const [result] = await pool.execute('INSERT INTO questions (title, description, skeleton, solution, points, exam_id, lang_id) VALUES (?, ?, ?, ?, ?, ?, ?)', values)
    return result
}

const updateQuestionByIdInDB = async (id, data) => {
    
  let updateFields = []
  let values = []
  
  for (let key in data) {
      updateFields.push(`${key} = ?`) 
      values.push(data[key])
  }

  // If no valid fields are provided, exit early.
  if (updateFields.length === 0) return { message: "No valid fields provided for update." }
  
  // Construct query dynamically
  const sqlQuery = `UPDATE questions SET ${updateFields.join(", ")} WHERE id = ?`
  values.push(id)

  const [results] = await pool.execute(sqlQuery, values)
  return results
}

const deleteQuestionByIdInDB = async (id) => {
  const [results] = await pool.execute('DELETE FROM questions WHERE id = ?', [id]);
  return results;
}

module.exports = { getAllQuestionsFromDB, getQuestionByIdFromDB, insertQuestionIntoDB, updateQuestionByIdInDB, deleteQuestionByIdInDB }

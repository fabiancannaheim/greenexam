
const pool = require('../db/db')

const getAllHintsFromDB = async () => {
    const [hints] = await pool.execute('SELECT * FROM hints')
    return hints
}

const getHintFromDB = async (id) => {
    const [hint] = await pool.execute('SELECT * FROM hints WHERE ID = ?', [id])
    return hint
}

const insertHintIntoDB = async (content, questionId) => {
    const [result] = await pool.execute('INSERT INTO hints (content, question_id) VALUES (?, ?)', [content, questionId])
    return result
}

const updateHintInDB = async (id, data) => {
    
    let updateFields = []
    let values = []
    
    for (let key in data) {
        updateFields.push(`${key} = ?`)
        values.push(data[key])
    }

    // If no valid fields are provided, exit early.
    if (updateFields.length === 0) return { message: "No valid fields provided for update." }
    
    // Construct query dynamically
    const sqlQuery = `UPDATE hints SET ${updateFields.join(", ")} WHERE id = ?`
    values.push(id)

    const [results] = await pool.execute(sqlQuery, values)
    return results
}

const deleteHintInDB = async (id) => {
    const [results] = await pool.execute('DELETE FROM hints WHERE id = ?', [id]);
    return results;
}


module.exports = { getAllHintsFromDB, insertHintIntoDB, getHintFromDB, updateHintInDB, deleteHintInDB }

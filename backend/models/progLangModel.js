
const pool = require('../db/db')

const getAllProgLangsFromDB = async () => {
    const [progLangs] = await pool.execute('SELECT * FROM programming_languages')
    return progLangs
}

const getProgLangByIdFromDB = async (id) => {
    const [user] = await pool.execute('SELECT * FROM programming_languages WHERE ID = ?', [id])
    return user
}

const getProgLangByNameFromDB = async (username) => {
  const [user] = await pool.execute('SELECT * FROM programming_languages WHERE name = ?', [username])
  return user
}


const insertProgLangIntoDB = async (name, compiler, executor) => {
    const [result] = await pool.execute('INSERT INTO programming_languages (name, compiler, executor) VALUES (?, ?, ?)', [name, compiler, executor])
    return result
}

const updateProgLangByIdInDB = async (id, data) => {
    
    let updateFields = []
    let values = []
    
    for (let key in data) {
        updateFields.push(`${key} = ?`)
        values.push(data[key])
    }

    // If no valid fields are provided, exit early.
    if (updateFields.length === 0) return { message: "No valid fields provided for update." }
    
    // Construct query dynamically
    const sqlQuery = `UPDATE programming_languages SET ${updateFields.join(", ")} WHERE id = ?`
    values.push(id)

    const [results] = await pool.execute(sqlQuery, values)
    return results
}

const deleteProgLangByIdInDB = async (id) => {
    const [results] = await pool.execute('DELETE FROM programming_languages WHERE id = ?', [id]);
    return results;
}


module.exports = { getAllProgLangsFromDB, getProgLangByIdFromDB, getProgLangByNameFromDB, insertProgLangIntoDB, updateProgLangByIdInDB, deleteProgLangByIdInDB }
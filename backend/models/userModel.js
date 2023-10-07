
const pool = require('../db/db')
const bcrypt = require('bcrypt')

const getAllUsersFromDB = async () => {
    const [users] = await pool.execute('SELECT * FROM users')
    return users
}

const getUserByIdFromDB = async (id) => {
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

const updateUserByIdInDB = async (id, data) => {
    
    let updateFields = []
    let values = []
    
    for (let key in data) {
        if (key === 'role') continue // for security purposes -> roles cannot be modified
        updateFields.push(`${key} = ?`)
        if (key !== 'password') {
            values.push(data[key])
        } else {
            const saltRounds = 10
            const hash = await bcrypt.hash(data[key], saltRounds)
            values.push(hash)
        }
    }

    // If no valid fields are provided, exit early.
    if (updateFields.length === 0) return { message: "No valid fields provided for update." }
    
    // Construct query dynamically
    const sqlQuery = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`
    values.push(id)

    const [results] = await pool.execute(sqlQuery, values)
    return results
}

const deleteUserByIdInDB = async (id) => {
    const [results] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return results;
}


module.exports = { getAllUsersFromDB, insertUserIntoDB, getUserByIdFromDB, getUserByUsernameFromDB, updateUserByIdInDB, deleteUserByIdInDB }

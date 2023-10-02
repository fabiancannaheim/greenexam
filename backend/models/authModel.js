
const pool = require('../db/db')
const bcrypt = require('bcrypt')

const verifyCredentials = async (username, password) => {
    const [user] = await pool.execute('SELECT * FROM users WHERE username = ?', [username])
    const passwordCorrect = await bcrypt.compare(password, user[0].password);
    return passwordCorrect ? { id:user[0].id, username:user[0].username } : false
}

module.exports = { verifyCredentials }
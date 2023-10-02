require('dotenv').config()

const jwt = require('jsonwebtoken')

const { verifyCredentials } = require('../models/authModel')

const login = async (req, res) => {

    const { username, password } = req.body
    const user = await verifyCredentials(username, password)

    if (user) {
        req.session.user = { id: user.id, username: user.username }
        const token = jwt.sign({ userId: user.id }, process.env.JSON_WEB_TOKEN_SECRET_KEY, { expiresIn: '1h' })
        res.json({ token })
    } else {
        res.status(401).json({ error: 'Invalid credentials' })
    }
}

const logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out, please try again' });
        }
        res.clearCookie('sid'); // 'sid' should be the name of your session id
        return res.status(200).json({ message: 'Logged out successfully' });
    })
}

module.exports = { login, logout }
require('dotenv').config()

const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Authorization header missing' })
  }
  const token = req.headers.authorization.split(' ')[1] // assuming `Authorization: Bearer <token>`
  try {
    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY)
    req.userId = decoded.userId
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = { verifyToken }
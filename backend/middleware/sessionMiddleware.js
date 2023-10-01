require('dotenv').config()

const session = require('express-session')

const sessionMiddleware = session({
  secret: process.env.SESSION_KEY, // Secret should be stored in a secure environment variable in production
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: process.env.SESSION_COOKIE_SECURE } 
})

module.exports = sessionMiddleware

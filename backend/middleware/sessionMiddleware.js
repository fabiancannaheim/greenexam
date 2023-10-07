require('dotenv').config()

const session = require('express-session')
//const FileStore = require('session-file-store')(session);

const sessionMiddleware = session({
  //store: new FileStore(),
  secret: process.env.SESSION_KEY, // Secret should be stored in a secure environment variable in production
  resave: false, 
  saveUninitialized: true,
  cookie: { 
    secure: process.env.SESSION_COOKIE_SECURE === 'true', 
    maxAge: 86400000,
    name: process.env.SESSION_COOKIE_NAME
  } 
})

module.exports = sessionMiddleware

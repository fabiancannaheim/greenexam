const express = require('express')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/authRoutes')
const progLangRoutes = require('./routes/progLangRoutes')
const executionRoutes = require('./routes/executionRoutes')
const userRoutes = require('./routes/userRoutes')
const examRoutes = require('./routes/examRoutes')
const sessionMiddleware = require('./middleware/sessionMiddleware')
const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware')

const app = express()
const PORT = 3000

// Utils
app.use(bodyParser.json())

// Before middleware
app.use(sessionMiddleware)

// Routes
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/proglang', progLangRoutes)
app.use('/exams', examRoutes)
app.use('/execution', executionRoutes)

app.get('/', (req, res) => {
  res.send('GreenExam')
})

// After middleware
app.use(errorHandlingMiddleware)

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
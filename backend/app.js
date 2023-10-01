const express = require('express')
const bodyParser = require('body-parser')


const codeRoutes = require('./routes/codeRoutes')
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
app.use('/code', codeRoutes)
app.use('/users', userRoutes)
app.use('/exams', examRoutes)

app.get('/', (req, res) => {
  res.send('GreenExam')
})

// After middleware
app.use(errorHandlingMiddleware)

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
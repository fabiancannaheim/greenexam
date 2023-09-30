const express = require('express')
const bodyParser = require('body-parser')
const codeRoutes = require('./routes/codeRoutes')
const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware')

const app = express()
const PORT = 3000

app.use(bodyParser.json())

app.use('/code', codeRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
});

//app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const logger = require('./utils/logger')
const promClient = require('prom-client')
const loadManager = require('./utils/LoadManager')

const authRoutes = require("./routes/authRoutes")
const progLangRoutes = require("./routes/progLangRoutes")
const userRoutes = require("./routes/userRoutes")
const examRoutes = require("./routes/examRoutes")
const questionRoutes = require("./routes/questionRoutes")
const hintRoutes = require("./routes/hintRoutes")
const answerRoutes = require("./routes/answerRoutes")
const codeRoutes = require("./routes/codeRoutes")
const metricsRoutes = require("./routes/metricsRoutes")
const stateRoutes = require("./routes/stateRoutes")

const sessionMiddleware = require("./middleware/sessionMiddleware")
const { sessionCounterMiddleware } = require("./utils/sessionCounter")
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware")

const app = express()
const PORT = 3000

const register = new promClient.Registry()
promClient.collectDefaultMetrics({ register })


// Add CORS to all requests
app.use(cors())

// Utils
app.use(bodyParser.json())

// Before middleware
app.use(sessionMiddleware)
app.use(sessionCounterMiddleware)

// Routes
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/exams", examRoutes)
app.use("/questions", questionRoutes)
app.use("/hints", hintRoutes)
app.use("/answers", answerRoutes)
app.use("/proglang", progLangRoutes)
app.use("/code", codeRoutes)
app.use("/metrics", metricsRoutes)
app.use("/states", stateRoutes)

app.get("/", (req, res) => {
  res.send("GreenExam")
})

// After middleware
app.use(errorHandlingMiddleware)

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

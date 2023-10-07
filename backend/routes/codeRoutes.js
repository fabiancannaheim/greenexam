const express = require('express')
const router = express.Router()
const { verifySession } = require('../middleware/authMiddleware')
const { executePython, executeJava } = require('../controllers/codeExecutionController')

router.post('/execute/python', verifySession, executePython)
router.post('/execute/java', verifySession, executeJava)

module.exports = router
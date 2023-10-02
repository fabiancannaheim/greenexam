const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/authMiddleware')
const { executePython, executeJava } = require('../controllers/codeExecutionController')

router.post('/execute/python', verifyToken, executePython)
router.post('/execute/java', verifyToken, executeJava)

module.exports = router
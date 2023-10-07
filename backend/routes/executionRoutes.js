const express = require('express')
const router = express.Router()
const { verifySession } = require('../middleware/authMiddleware')
const { executeCode } = require('../controllers/executionController')

router.post('/:language', verifySession, executeCode)

module.exports = router
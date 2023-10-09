const express = require('express')
const router = express.Router()

const paramCheck = require('../validators/executionValidator')
const validate = require('../middleware/validationMiddleware')
const { verifySession } = require('../middleware/authMiddleware')
const { executeCode } = require('../controllers/executionController')

// session must be verified in production

router.post('/:language', paramCheck.execute, validate, executeCode)

module.exports = router
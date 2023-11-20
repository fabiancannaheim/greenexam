const express = require('express')
const router = express.Router()

const paramCheck = require('../validators/codeValidator')
const validate = require('../middleware/validationMiddleware')
const { verifySession } = require('../middleware/authMiddleware')
const { throttle } = require('../middleware/restrictionMiddleware')
const { executeCode, autocomplete } = require('../controllers/codeController')

// session must be verified in production


router.post('/execute/:lang', paramCheck.execution, validate, executeCode)
router.post('/autocomplete/:lang', paramCheck.autocompletion, validate, autocomplete)

module.exports = router
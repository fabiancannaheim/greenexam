const express = require('express')
const router = express.Router()

const paramCheck = require('../validators/codeValidator')
const validate = require('../middleware/validationMiddleware')
const { verifySession } = require('../middleware/authMiddleware')
const { codeExecutionThrottling, autocompleteRestriction } = require('../middleware/restrictionMiddleware')
const { executeCode, autocomplete } = require('../controllers/codeController')

const { loadManager, FeatureState } = require('../utils/LoadManager')

// session must be verified in production


router.post('/execute/:lang', codeExecutionThrottling(10000), paramCheck.execution, validate, executeCode)
router.post('/autocomplete/:lang', autocompleteRestriction(), paramCheck.autocompletion, validate, autocomplete)

module.exports = router
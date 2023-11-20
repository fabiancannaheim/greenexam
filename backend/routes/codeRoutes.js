const express = require('express')
const router = express.Router()

const paramCheck = require('../validators/codeValidator')
const validate = require('../middleware/validationMiddleware')
const { verifySession } = require('../middleware/authMiddleware')
const { throttle, restrictFeature } = require('../middleware/restrictionMiddleware')
const { executeCode, autocomplete } = require('../controllers/codeController')

const { loadManager, FeatureState } = require('../utils/LoadManager')

// session must be verified in production

if (loadManager.state <= FeatureState.ON_DEMAND_EXECUTION) {
    router.post('/execute/:lang', paramCheck.execution, validate, executeCode)
} else {
    router.post('/execute/:lang', throttle(10000), paramCheck.execution, validate, executeCode)
}

if (loadManager.state <= FeatureState.CLIENT_SIDE_PROCESSING) {
    router.post('/autocomplete/:lang', paramCheck.autocompletion, validate, autocomplete)
} else {
    router.post('/autocomplete/:lang', restrictFeature, paramCheck.autocompletion, validate, autocomplete)
}

module.exports = router
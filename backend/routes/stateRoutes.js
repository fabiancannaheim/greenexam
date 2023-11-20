const express = require('express')
const router = express.Router()

const { loadManager, FeatureState } = require('../utils/LoadManager')

router.get('/', async (req, res, next) => {
    try {
        res.json({state: loadManager.state})
    } catch (error) {1
        next(error)
    }
})

router.get('/rtexec', async (req, res, next) => {
    try {
        res.json({rtexec: loadManager.state === FeatureState.FULL_FEATURES})
    } catch (error) {1
        next(error)
    }
})

module.exports = router
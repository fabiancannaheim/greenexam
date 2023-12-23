const express = require('express')
const router = express.Router()

const controller = require('../controllers/metricsController')

router.get('/', controller.getAll)
router.get('/cpu', controller.getCpuUsage)
router.get('/ram', controller.getRamUsage)

router.get('/prometheus', controller.prometheusMetrics)

module.exports = router
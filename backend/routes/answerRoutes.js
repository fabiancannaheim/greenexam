const express = require('express')
const router = express.Router()

const paramCheck = require('../validators/answerValidator')
const validate = require('../middleware/validationMiddleware')
const controller = require('../controllers/answerController')

router.get('/', controller.getAll)
router.get('/:id', paramCheck.id, validate, controller.getById)
router.post('/', paramCheck.insert, validate, controller.create)
router.put('/:id', paramCheck.id, validate, controller.update)
router.delete('/:id', paramCheck.id, validate, controller.delete)

module.exports = router
const express = require('express')
const router = express.Router()

const paramCheck = require('../validators/hintValidator')
const validate = require('../middleware/validationMiddleware')
const hintController = require('../controllers/hintController')

router.get('/', hintController.getAll)
router.get('/:id', paramCheck.id, validate, hintController.getById)
router.post('/', paramCheck.insert, validate, hintController.create)
router.put('/:id', paramCheck.id, validate, hintController.update)
router.delete('/:id', paramCheck.id, validate, hintController.delete)

module.exports = router
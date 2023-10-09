const express = require('express')
const router = express.Router()

const paramCheck = require('../validators/progLangValidator')
const validate = require('../middleware/validationMiddleware')
const progLangController = require('../controllers/progLangController')

router.get('/', progLangController.getAll)
router.get('/:id', paramCheck.id, validate, progLangController.getById)
router.post('/', paramCheck.insert, validate, progLangController.create)
router.put('/:id', paramCheck.id, validate, progLangController.update)
router.delete('/:id', paramCheck.id, validate, progLangController.delete)


module.exports = router
const express = require('express')
const router = express.Router()

const paramCheck = require('../validators/questionValidator')
const validate = require('../middleware/validationMiddleware')

const questionController = require('../controllers/questionController')
const hintController = require('../controllers/hintController')

router.get('/', questionController.getAll)
router.get('/:id', paramCheck.id, validate, questionController.getById)
router.post('/', paramCheck.insert, validate, questionController.create)
router.put('/:id', paramCheck.id, validate, questionController.update)
router.delete('/:id', paramCheck.id, validate, questionController.delete)

router.get('/:id/hints', paramCheck.byExam, validate, hintController.getAllByQuestionId)

module.exports = router
const express = require('express')
const router = express.Router()

const paramCheck = require('../validators/examValidator')
const validate = require('../middleware/validationMiddleware')

const examController = require('../controllers/examController')
const questionController = require('../controllers/questionController')
const answerController = require('../controllers/answerController')

// exams
router.get('/', examController.getAll)
router.get('/:id', paramCheck.id, validate, examController.getById)
router.post('/', paramCheck.insert, validate, examController.createExam)
router.put('/:id', paramCheck.id, validate, examController.update)
router.delete('/:id', paramCheck.id, validate, examController.delete)

// questions
router.get('/:id/questions', questionController.getAllByExamId)

// answers
router.get('/:examId/users/:userId/answers', answerController.getAllByExamAndUser)


module.exports = router
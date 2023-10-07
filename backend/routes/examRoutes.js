const express = require('express')
const router = express.Router()

const { getAllExams, getExamById, createExam, updateExamById, deleteExamById } = require('../controllers/examController')
const { getAllExamQuestions, getExamQuestionById, createQuestion, updateQuestion, deleteQuestion } = require('../controllers/questionController')

// exams
router.get('/', getAllExams)
router.get('/:id', getExamById)
router.post('/', createExam)
router.put('/:id', updateExamById)
router.delete('/:id', deleteExamById)

// questions
router.get('/:id/questions', getAllExamQuestions)
router.get('/:examId/questions/:questionId', getExamQuestionById)
router.post('/:id/questions', createQuestion)
router.put('/:examId/questions/:questionId', updateQuestion)
router.delete('/:examId/questions/:questionId', deleteQuestion)

module.exports = router
const express = require('express')
const router = express.Router()

const { getAllExams, createExam } = require('../controllers/examController')

router.get('/', getAllExams)
router.post('/create', createExam)

module.exports = router
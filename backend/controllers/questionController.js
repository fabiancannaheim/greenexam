const baseController = require('./base/baseController')
const questionModel = require('../models/questionModel')

const questionController = baseController(questionModel)

questionController.getAllByExamId = async (req, res, next) => {
    try {
        const examId = req.params.id
        if (!examId) return res.status(400).send("Exam ID is required.")
        if (isNaN(examId)) return res.status(400).send("Exam ID must be a valid number.")
        const questions = await questionModel.where('exam_id', examId)
        res.json(questions)
    } catch (error) {
        next(error);
    }
}

module.exports = questionController

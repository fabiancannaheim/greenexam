const baseController = require('./base/baseController')
const answerModel = require('../models/answerModel')

const answerController = baseController(answerModel)

answerController.getAllByExamAndUser = async (req, res, next) => {
    try {
        const examId = req.params.examId
        const userId = req.params.userId
        const answers = await answerModel.getAllByExamAndUser(examId, userId)
        res.json(answers)
    } catch (error) {
        next(error);
    }
}

module.exports = answerController

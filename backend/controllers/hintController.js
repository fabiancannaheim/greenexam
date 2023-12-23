
const hintModel = require('../models/hintModel')
const baseController = require('./base/baseController')

const hintController = baseController(hintModel)

hintController.getAllByQuestionId = async (req, res, next) => {
    try {
        const questionId = req.params.id
        if (!questionId) return res.status(400).send("ID is required.")
        if (isNaN(questionId)) return res.status(400).send("ID must be a valid number.")
        const hints = await hintModel.where('question_id', questionId)
        res.json(hints)
    } catch (error) {
        next(error);
    }
}

module.exports = hintController
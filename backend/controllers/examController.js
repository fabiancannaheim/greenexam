
const model = require('../models/examModel')
const baseController = require('./base/baseController')

const examController = baseController(model)

examController.createExam = async (req, res, next) => {
    try {
        const userId = req.session.userId
        if (!userId || userId === undefined) return res.status(404).send("User not found")
        req.body = { ...req.body, user_id: userId }
        return examController.create(req, res, next)
    } catch (error) {
        next(error);
    }
}

module.exports = examController

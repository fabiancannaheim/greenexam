
const { getAllQuestionsFromDB, getQuestionByIdFromDB, insertQuestionIntoDB, updateQuestionByIdInDB, deleteQuestionByIdInDB } = require('../models/questionModel')

const getAllExamQuestions = async (req, res) => {
    try {
        const users = await getAllQuestionsFromDB()
        res.json(users);
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const getExamQuestionById = async (req, res) => {
    try {
        const users = await getQuestionByIdFromDB()
        res.json(users);
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const createQuestion = async (req, res) => {
    try {
        const examId = req.params.id;
        const { title, description, skeleton, solution, points, lang_id } = req.body;
        if (!title) return res.status(400).send("Question needs a title")
        if (!description) return res.status(400).send("Question needs a description")
        if (!skeleton) return res.status(400).send("Question needs a skeleton")
        if (!solution) return res.status(400).send("Question needs a solution")
        if (!points) return res.status(400).send("Question needs points")
        if (!examId) return res.status(400).send("Question needs an assigned exam")
        if (!lang_id) return res.status(400).send("Question needs an assigned programming language")
        const result = await insertQuestionIntoDB(title, description, skeleton, solution, points, examId, lang_id)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const updateQuestion = async (req, res) => {
    try {
        const id = req.params.questionId
        const data = req.body
        const result = await updateQuestionByIdInDB(id, data)
        res.json(result)
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const id = req.params.questionId
        const result = await deleteQuestionByIdInDB(id)
        res.json(result)
    } catch (error) {
        res.status(500).send(error.toString())
    }
}


module.exports = { getAllExamQuestions, getExamQuestionById, createQuestion, updateQuestion, deleteQuestion }

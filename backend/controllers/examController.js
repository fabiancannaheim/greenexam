
const { getAllExamsFromDB, getExamByIdFromDB, insertExamIntoDB, updateExamByIdInDB, deleteExamByIdInDB } = require('../models/examModel')

const getAllExams = async (req, res) => {
    try {
        const users = await getAllExamsFromDB()
        res.json(users);
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const getExamById = async (req, res) => {
    try {
        const users = await getExamByIdFromDB()
        res.json(users);
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const createExam = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.session.userId
        if (!title) return res.status(400).send("Exam needs a title")
        if (!userId || userId === undefined) return res.status(400).send("User not found")
        const result = await insertExamIntoDB(title, userId)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const updateExamById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await updateExamByIdInDB(id, data);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
}

const deleteExamById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteExamByIdInDB(id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
}


module.exports = { getAllExams, getExamById, createExam, updateExamById, deleteExamById }

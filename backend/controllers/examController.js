
const { getAllExamsFromDB, insertExamIntoDB } = require('../models/examModel')

const getAllExams = async (req, res) => {
    try {
        const users = await getAllExamsFromDB()
        res.json(users);
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const createExam = async (req, res) => {

    try {

        const { title, user_id } = req.body;

        if (!title) {
            return res.status(400).send("Exam needs a title");
        }

        const result = await insertExamIntoDB(title, user_id)
        res.status(201).json(result)

    } catch (error) {
        res.status(500).send(error.toString())
    }
      
}


module.exports = { getAllExams, createExam }

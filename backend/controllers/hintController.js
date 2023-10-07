
const { getAllHintsFromDB, getHintFromDB, insertHintIntoDB, updateHintInDB, deleteHintInDB } = require('../models/hintModel')

const getAllHints = async (req, res) => {
    try {
        const hints = await getAllHintsFromDB()
        res.json(hints);
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const getHint = async (req, res) => {
  try {
      const id =  req.params.id

      if (isNaN(id)) {
          return res.status(400).send("Hint ID must be a valid number")
      }

      const hint = await getHintFromDB(id)
      res.json(user);
  } catch (error) {
      res.status(500).send(error.toString())
  }
}

const createHint = async (req, res) => {
    try {

        const questionId =  req.params.id

        const { content } = req.body

        if (!content) return res.status(400).send("Hint content is required.")
        if (!questionId) return res.status(400).send("Question assignment is required.")

        const result = await insertHintIntoDB(content, questionId)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error.toString())
    }
}


const updateHint = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await updateHintInDB(id, data);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
}

const deleteHint = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteHintInDB(id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
}


module.exports = { getAllHints, getHint, createHint, updateHint, deleteHint }
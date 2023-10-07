
const { getAllProgLangsFromDB, getProgLangByIdFromDB, getProgLangByNameFromDB, insertProgLangIntoDB, updateProgLangByIdInDB, deleteProgLangByIdInDB } = require('../models/progLangModel')

const getAllProgLangs = async (req, res) => {
    try {
        const progLangs = await getAllProgLangsFromDB()
        res.json(progLangs);
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const getProgLangById = async (req, res) => {
    try {
        const id =  req.params.id
  
        if (isNaN(id)) {
            return res.status(400).send("Language ID must be a valid number")
        }
  
        const user = await getProgLangByIdFromDB(id)
        res.json(user);
    } catch (error) {
        res.status(500).send(error.toString())
    }
}
  
const getProgLangByName = async (req, res) => {
    try {
        const username =  req.params.username
        const user = await getProgLangByNameFromDB(username)
        res.json(user);
    } catch (error) {
        res.status(500).send(error.toString())
    }
}
  
const createProgLang = async (req, res) => {
    try {
        const { name, compiler, executor } = req.body

        if (!name || !compiler || !executor) {
            return res.status(400).send("Name, compiler and executor are required.")
        }

        const result = await insertProgLangIntoDB(name, compiler, executor)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error.toString())
    }
}
      
const updateProgLangById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await updateProgLangByIdInDB(id, data);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
}

const deleteProgLangById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteProgLangByIdInDB(id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
}

module.exports = { getAllProgLangs, getProgLangById, getProgLangByName, createProgLang, updateProgLangById, deleteProgLangById }
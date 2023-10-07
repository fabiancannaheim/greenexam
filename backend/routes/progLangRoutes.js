const express = require('express')
const router = express.Router()

const { getAllProgLangs, getProgLangById, getProgLangByName, createProgLang, updateProgLangById, deleteProgLangById } = require('../controllers/progLangController')

router.get('/', getAllProgLangs)
router.get('/:id', getProgLangById)
router.get('/name/:username', getProgLangByName)

router.post('/', createProgLang)

router.put('/:id', updateProgLangById)

router.delete('/:id', deleteProgLangById)


module.exports = router
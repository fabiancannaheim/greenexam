const express = require('express')
const router = express.Router()

const { getAllQuestionHints, getHint, createHint, updateHint, deleteHint } = require('../controllers/hintController')

router.get('/:questionId/hints', getAllQuestionHints)
router.get('/:questionId/hints/:id', getHint)
router.post('/:id/hints', createHint)
router.put('/:questionId/hints/:id', updateHint)
router.delete('/:questionId/hints/:id', deleteHint)

module.exports = router
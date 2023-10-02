const express = require('express')
const router = express.Router()

const { getAllUsers, getUserByID, getUserByUsername, createStudent, createAdmin } = require('../controllers/userController')

router.get('/read/all', getAllUsers)
router.get('/read/id/:id', getUserByID)
router.get('/read/username/:username', getUserByUsername)
router.post('/create/student', createStudent)
router.post('/create/admin', createAdmin)

module.exports = router
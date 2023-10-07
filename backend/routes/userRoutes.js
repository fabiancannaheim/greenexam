const express = require('express')
const router = express.Router()

const { verifyToken } = require('../middleware/authMiddleware')
const { getAllUsers, getUserByID, getUserByUsername, createStudent, createAdmin } = require('../controllers/userController')

router.post('/read/all', verifyToken, getAllUsers)
router.post('/read/id/:id', verifyToken, getUserByID)
router.post('/read/username/:username', verifyToken, getUserByUsername)

router.post('/create/admin', createAdmin)
router.post('/create/student', createStudent)


module.exports = router
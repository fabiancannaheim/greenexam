const express = require('express')
const router = express.Router()

const { getAllUsers, getUserById, getUserByUsername, createStudent, createAdmin, updateUserById, deleteUserById } = require('../controllers/userController')

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.get('/name/:username', getUserByUsername)

router.post('/admin', createAdmin)
router.post('/student', createStudent)

router.put('/:id', updateUserById)

router.delete('/:id', deleteUserById)


module.exports = router
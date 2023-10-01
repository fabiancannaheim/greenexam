const express = require('express')
const router = express.Router()

const { getAllUsers, createStudent, createAdmin } = require('../controllers/userController')

router.get('/', getAllUsers)
router.post('/create/student', createStudent)
router.post('/create/admin', createAdmin)

module.exports = router
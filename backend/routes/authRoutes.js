const express = require('express')
const router = express.Router()

const paramCheck = require('../validators/authValidator')
const validate = require('../middleware/validationMiddleware')
const { login, logout } = require('../controllers/authController')

router.post('/login', paramCheck.login, validate, login)
router.post('/logout', logout)

module.exports = router
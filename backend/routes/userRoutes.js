const express = require('express')
const router = express.Router()

const paramCheck = require('../validators/userValidator')
const validate = require('../middleware/validationMiddleware')
const controller = require('../controllers/userController')

router.get('/', controller.getAll)
router.get('/:id', paramCheck.id, validate, controller.getById)
router.post('/admin', paramCheck.insert, validate, controller.createAdmin)
router.post('/student', paramCheck.insert, validate, controller.createStudent)
router.put('/:id', paramCheck.id, validate, controller.updateUser)
router.delete('/:id', paramCheck.id, validate, controller.delete)

module.exports = router
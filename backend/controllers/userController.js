
const bcrypt = require('bcrypt')
const model = require('../models/userModel')
const baseController = require('./base/baseController')

const userController = baseController(model)

const SALT_ROUNDS = 10

userController.createAdmin = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS)
        req.body = { ...req.body, role: 'admin' }
        return userController.create(req, res, next)
    } catch (error) {
        next(error);
    }
}

userController.createStudent = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS)
        req.body = { ...req.body, role: 'student' }
        return userController.create(req, res, next)
    } catch (error) {
        next(error);
    }
}

userController.updateUser = async (req, res, next) => {
    try {
        for (let key in req.body) {
            if (key === 'role') continue // for security purposes -> roles cannot be modified
            if (key === 'password') req.body[key] = await bcrypt.hash(req.body[key], SALT_ROUNDS)
        }
        return userController.update(req, res, next)
    } catch (error) {
        next(error);
    }
}

module.exports = userController

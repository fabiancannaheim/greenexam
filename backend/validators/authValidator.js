const { check } = require('express-validator');

const baseValidator = require('./base/baseValidator')

module.exports = {

    ...baseValidator,

    login: [
        check('username').notEmpty().withMessage('Username is required'),
        check('password').notEmpty().withMessage('Password is required'),
        check('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters')
    ]

}


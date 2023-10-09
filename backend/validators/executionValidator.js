const { check } = require('express-validator');

const baseValidator = require('./base/baseValidator')

module.exports = {

    ...baseValidator,

    execute: [
        check('code').notEmpty().withMessage('Code is required'),
    ]

}


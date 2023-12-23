const { check } = require('express-validator');

const baseValidator = require('./base/baseValidator')

module.exports = {

    ...baseValidator,

    insert: [
        check('name').notEmpty().withMessage('Username is required'),
        check('executor').notEmpty().withMessage('Executor is required')
    ]

}


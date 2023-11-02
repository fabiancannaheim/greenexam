const { check } = require('express-validator');

const baseValidator = require('./base/baseValidator')

module.exports = {

    ...baseValidator,

    execution: [
        check('code').notEmpty().withMessage('Code is required'),
    ],

    autocompletion: [
        check('code').notEmpty().withMessage('Code is required'),
        check('line').notEmpty().withMessage('Cursor line is required'),
        check('col').notEmpty().withMessage('Cursor column is required')
    ]

}


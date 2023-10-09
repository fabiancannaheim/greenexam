const { check } = require('express-validator');

const baseValidator = require('./base/baseValidator')

module.exports = {

    ...baseValidator,

    insert: [
        check('content').notEmpty().withMessage('content is required'),
        check('question_id').notEmpty().withMessage('question_id is required'),
        check('question_id').isNumeric().withMessage('question_id must be a numeric value')
    ]

}


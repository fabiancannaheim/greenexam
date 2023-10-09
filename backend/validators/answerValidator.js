const { check } = require('express-validator');

const baseValidator = require('./base/baseValidator')

module.exports = {

    ...baseValidator,

    insert: [
        check('content').notEmpty().withMessage('content is required'),
        check('user_id').notEmpty().withMessage('user_id is required'),
        check('question_id').notEmpty().withMessage('question_id is required'),
        check('user_id').isNumeric().withMessage('user_id must be a valid numeric value'),
        check('question_id').isNumeric().withMessage('question_id must be a valid numeric value')
    ]

}
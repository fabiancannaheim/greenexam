const { check } = require('express-validator');

const baseValidator = require('./base/baseValidator')

module.exports = {

    ...baseValidator,

    insert: [
        check('title').notEmpty().withMessage('title is required'),
        check('description').notEmpty().withMessage('description is required'),
        check('skeleton').notEmpty().withMessage('skeleton is required'),
        check('solution').notEmpty().withMessage('solution is required'),
        check('points').notEmpty().withMessage('points is required'),
        check('exam_id').notEmpty().withMessage('exam_id is required'),
        check('lang_id').notEmpty().withMessage('lang_id is required'),
        check('points').isNumeric().withMessage('points must be a valid numeric value'),
        check('exam_id').isNumeric().withMessage('exam_id must be a valid numeric value'),
        check('lang_id').isNumeric().withMessage('lang_id must be a valid numeric value')
    ]

}
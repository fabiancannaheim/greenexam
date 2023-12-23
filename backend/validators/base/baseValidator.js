const { check } = require('express-validator')

module.exports = {

    id: [
        check('id').notEmpty().withMessage('ID is required')
    ]

}
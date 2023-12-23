const baseController = require('./base/baseController')
const model = require('../models/progLangModel')

const progLangController = baseController(model)

module.exports = progLangController
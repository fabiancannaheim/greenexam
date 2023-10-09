
const { validationResult } = require('express-validator')

module.exports = (model) => ({

    getAll: async (req, res, next) => {
        try {
            const items = await model.getAll()
            res.json(items)
        } catch (error) {1
            next(error)
        }
    },

    getById: async (req, res, next) => {
        try {
            const item = await model.getById(req.params.id)
            if (!item || (Array.isArray(item) && item.length === 0)) return res.status(404).send("Item not found")
            res.json(item)
        } catch (error) {
            next(error)
        }
    },

    create: async (req, res, next) => {
        try {
            const result = await model.insert(req.body)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    },

    update: async (req, res, next) => {
        try {
            const result = await model.update(req.params.id, req.body)
            if (!result) return res.status(404).send("Item not found")
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    },

    delete: async (req, res, next) => {
        try {
            const result = await model.delete(req.params.id)
            if (!result) return res.status(404).send("Item not found")
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
})

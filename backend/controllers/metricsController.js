
const promClient = require('prom-client');
const systemMetrics = require('../models/metricsModel');

module.exports = {

    prometheusMetrics: async (req, res, next) => {
        try {
            const metrics = await promClient.register.metrics()
            res.set('Content-Type', promClient.register.contentType)
            res.end(metrics)
        } catch (error) {1
            next(error)
        }
    },

    getAll: async (req, res, next) => {
        try {
            const metrics = {
                cpu: await systemMetrics.getCpuUsage(),
                ram: await systemMetrics.getRamUsage()
            }
            res.json(metrics)
        } catch (error) {1
            next(error)
        }
    },

    getCpuUsage: async (req, res, next) => {
        try {
            const cpu = await systemMetrics.getCpuUsage()
            res.json({cpu_usage: cpu})
        } catch (error) {1
            next(error)
        }
    },

    getRamUsage: async (req, res, next) => {
        try {
            const ram = await systemMetrics.getRamUsage()
            res.json({ram_usage: ram})
        } catch (error) {1
            next(error)
        }
    }

}


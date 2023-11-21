require('dotenv').config()
const { loadManager, FeatureState } = require("../utils/LoadManager")

const codeExecutionThrottling = (time) => {
    return function(req, res, next) {
        const currentFeatureState = loadManager.state
        if (currentFeatureState >= FeatureState.ON_DEMAND_EXECUTION) {
            return throttle(time)(req, res, next)
        } else {
            next()
        }
    }
}

const autocompleteRestriction = () => {
    return function(req, res, next) {
        const currentFeatureState = loadManager.state
        if (currentFeatureState >= FeatureState.CLIENT_SIDE_PROCESSING) {
            res.status(429).send("Feature is deactivated. Please try again later.")
        } else {
            next()
        }
    }
}

const throttle = (minIntervalInMillis) => {

    const lastExecutionTimeBySession = {}

    return function(req, res, next) {
        const sessionId = req.sessionId
        const currentTime = Date.now()

        if (!lastExecutionTimeBySession[sessionId]) {
            // First time execution for this session
            lastExecutionTimeBySession[sessionId] = currentTime
            next()
        } else {
            const timeSinceLastExecution = currentTime - lastExecutionTimeBySession[sessionId]

            if (timeSinceLastExecution >= minIntervalInMillis) {
                // Enough time has passed since the last execution
                lastExecutionTimeBySession[sessionId] = currentTime
                next()
            } else {
                // Throttle if the request is made too soon
                const waitTime = minIntervalInMillis - timeSinceLastExecution
                res.status(429).json({
                    message: `Please wait for ${waitTime}ms before executing code again.`
                });
            }
        }
    }
}


const restrictPolling = () => {

    let lastAllowedTime = Date.now()

    return function(req, res, next) {

        const currentTime = Date.now()

        // Compute min interval between requests based on system load
        let minInterval
        if (global.CPU_LOAD > 0.7 || global.RAM_LOAD > 0.7) {
            minInterval = 5000
        } else if (global.CPU_LOAD > 0.5 || global.RAM_LOAD > 0.5) {
            minInterval = 3000
        } else if (global.CPU_LOAD > 0.3 || global.RAM_LOAD > 0.3) {
            minInterval = 1000
        } else {
            minInterval = 0
        }

        if (currentTime - lastAllowedTime >= minInterval) {
            lastAllowedTime = currentTime
            next()
        } else {
            if (process.env.POLLING_POSTPONE) {
                // Delay request
                setTimeout(() => {
                    lastAllowedTime = Date.now()
                    next()
                }, minInterval - (currentTime - lastAllowedTime))
            } else {
                // Deny request
                res.status(429).send("Too many polling requests. Please try again later.")
            }
        }
    }
}

const restrictFeature = (maxCpuLoad, maxRamLoad) => {

    return function(req, res, next) {

        if (global.CPU_LOAD >= maxCpuLoad || global.RAM_LOAD >= maxRamLoad) {
            res.status(429).send("Feature is deactivated. Please try again later.")
        } else {
            next()
        }

    }

}

module.exports = { codeExecutionThrottling, autocompleteRestriction, restrictPolling, restrictFeature, throttle }

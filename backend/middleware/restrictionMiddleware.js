require('dotenv').config()

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

module.exports = { restrictPolling, restrictFeature }

const os = require('os')
const promClient = require('prom-client')
const { loadManager, FeatureState } = require('../utils/LoadManager')

const cpuUsageGauge = new promClient.Gauge({
    name: 'cpu_usage',
    help: 'CPU Usage',
    registers: [promClient.register]
})

const ramUsageGauge = new promClient.Gauge({
    name: 'ram_usage',
    help: 'RAM Usage',
    registers: [promClient.register]
})

const computeCpuUsage = () => {

    const cpus = os.cpus()
    let totalIdleTime = 0
    let totalTickTime = 0

    cpus.forEach((cpu) => {
        for (type in cpu.times) {
            totalTickTime += cpu.times[type]
        }
        totalIdleTime += cpu.times.idle
    });

    return {
        totalIdleTime,
        totalTickTime
    };
}

let previousCpuInfo = computeCpuUsage()

const updateSystemMetrics = () => {

    const totalMemory = os.totalmem()
    const freeMemory = os.freemem()
    const usedMemory = totalMemory - freeMemory
    const memUsage = (Number(((usedMemory / totalMemory) * 100).toFixed(2))) / 100

    const finalCpuInfo = computeCpuUsage()
    const idleDifference = finalCpuInfo.totalIdleTime - previousCpuInfo.totalIdleTime
    const totalDifference = finalCpuInfo.totalTickTime - previousCpuInfo.totalTickTime
    const cpuUsage = (100 - Math.round((100 * idleDifference) / totalDifference)) / 100

    // Update previous CPU info for next interval
    previousCpuInfo = finalCpuInfo;

    // Set Gauges for API access
    cpuUsageGauge.set(cpuUsage);
    ramUsageGauge.set(memUsage);

    // Set global variable for internal access
    global.RAM_LOAD = memUsage;
    global.CPU_LOAD = cpuUsage;

    loadManager.updateState(cpuUsage, memUsage)

}

// Update metrics every 5 seconds
setInterval(updateSystemMetrics, 500)

module.exports = {

    getCpuUsage: async () => {
        try {
            const cpuData = await cpuUsageGauge.get()
            if (cpuData && cpuData.values && cpuData.values.length > 0) {
                return cpuData.values[0].value
            } else {
                console.log("CPU data unavailable.")
                return null
            }
        } catch (error) {
            console.error("Error retrieving CPU usage:", error)
            return null
        }
    },
    getRamUsage: async () => {
        try {
            const ramData = await ramUsageGauge.get()
            if (ramData && ramData.values && ramData.values.length > 0) {
                return ramData.values[0].value
            } else {
                console.log("RAM gauge data unavailable.")
                return null
            }
        } catch (error) {
            console.error("Error retrieving RAM usage:", error)
            return null
        }
    }

}

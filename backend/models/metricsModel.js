const promClient = require('prom-client')
const os = require('os');

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

const updateSystemMetrics = () => {

    const totalMemory = os.totalmem()
    const freeMemory = os.freemem()
    const usedMemory = totalMemory - freeMemory
    const usedMemoryInMB = usedMemory / 1024 / 1024
    const memUsage = Number((usedMemory / totalMemory).toFixed(2))
    const cpuUsage = os.loadavg()[0]
    const cpuCores = os.cpus().length
    const cpuLoad = cpuUsage / cpuCores

    // Set Gauge for API access
    cpuUsageGauge.set(cpuLoad)
    ramUsageGauge.set(memUsage)

    // Set global variable for internal access
    global.RAM_LOAD = memUsage
    global.CPU_LOAD = cpuLoad

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

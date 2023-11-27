
const logger = require('../utils/logger')
const { getActiveSessions } = require("../utils/sessionCounter")

class FeatureState {
    static FULL_FEATURES = 1
    static ON_DEMAND_EXECUTION = 2
    static THROTTLED_EXECUTION = 3
    static CLIENT_SIDE_PROCESSING = 4
    static MINIMAL_COMPILATION = 5
}

class LoadManager {

    constructor() {
        if (!LoadManager.instance) {
            this._state = FeatureState.FULL_FEATURES
            LoadManager.instance = this
        }
        return LoadManager.instance
    }

    get state() {
        return this._state
    }

    updateState(cpuLoad, ramLoad) {
        if (cpuLoad > 0.9 /*|| ramLoad > 0.9*/) {
            if (this._state < FeatureState.MINIMAL_COMPILATION) {
                this._state++
            }
        } else if (cpuLoad < 0.5 /*&& ramLoad < 0.5*/) { 
            if (this._state > FeatureState.FULL_FEATURES) {
                this._state--
            }
        }
        //logger.sys({ state: this._state, CPULoad: cpuLoad, RAMLoad: ramLoad })
        logger.sys("", { state: this._state, users: getActiveSessions(), CPULoad: cpuLoad, RAMLoad: ramLoad });

    }

}

const loadManager = new LoadManager()
//Object.freeze(loadManager)

module.exports = { loadManager, FeatureState }

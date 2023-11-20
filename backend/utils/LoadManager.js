
class FeatureState {
    static FULL_FEATURES = 1;
    static ON_DEMAND_EXECUTION = 2;
    static THROTTLED_EXECUTION = 3;
    static CLIENT_SIDE_PROCESSING = 4;
    static MINIMAL_COMPILATION = 5;
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

    updateState(currentLoad) {
        if (currentLoad > 90) {
            if (this._state < FeatureState.MINIMAL_COMPILATION) {
                this._state++
            }
        } else if (currentLoad < 50) { 
            if (this._state > FeatureState.FULL_FEATURES) {
                this._state--
            }
        }
    }

}

const loadManager = new LoadManager()
Object.freeze(loadManager)

module.exports = { loadManager, FeatureState }

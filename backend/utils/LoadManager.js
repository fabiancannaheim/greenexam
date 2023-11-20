
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
            this.state = FeatureState.FULL_FEATURES
            LoadManager.instance = this
        }
        return LoadManager.instance
    }

    updateState(currentLoad) {
        if (currentLoad > 90) {
            if (this.state < FeatureState.MINIMAL_COMPILATION) {
                this.state++
            }
        } else if (currentLoad < 50) { 
            if (this.state > FeatureState.FULL_FEATURES) {
                this.state--
            }
        }
        this.applyState()
    }

    applyState() {
        switch (this.state) {
            case FeatureState.FULL_FEATURES:
                this.enableAllFeatures()
                break
            case FeatureState.ON_DEMAND_EXECUTION:
                this.disableRTExecution()
                break
            case FeatureState.THROTTLED_EXECUTION:
                this.throttleOnDemandExecution()
                break
            case FeatureState.CLIENT_SIDE_PROCESSING:
                this.disableAutoCompleteAndErrorChecking()
                break
            case FeatureState.MINIMAL_COMPILATION:
                this.adjustCompilationOptions()
                break
        }
    }

}

const instance = new LoadManager()
Object.freeze(instance)

module.exports = instance

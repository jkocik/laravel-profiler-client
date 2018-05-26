export default class Application {
    constructor(data) {
        this.locale = data.locale;
        this.routesAreCached = data.routes_are_cached;
        this.configurationIsCached = data.configuration_is_cached;
        this.isDownForMaintenance = data.is_down_for_maintenance;
        this.shouldSkipMiddleware = data.should_skip_middleware;
    }
}

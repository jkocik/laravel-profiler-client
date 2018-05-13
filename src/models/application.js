export default class Application {
    constructor(data) {
        this.locale = data.locale;
        this.routes_are_cached = data.routes_are_cached;
        this.configuration_is_cached = data.configuration_is_cached;
        this.is_down_for_maintenance = data.is_down_for_maintenance;
    }
}

import Path from './path';
import Binding from './binding';
import Application from './application';
import { trackerService } from './../services/tracker.model.service';

export default class Tracker {
    constructor(data) {
        this.executionAt = trackerService.executionAt(data.meta.execution_at);
        this.id = data.meta.id;
        this.laravelVersion = data.meta.laravel_version;
        this.phpVersion = data.meta.php_version;
        this.env = data.meta.env;
        this.running = trackerService.running(data.meta.is_running_in_console);
        this.type = trackerService.type(data.meta.type);
        this.typeGroup = trackerService.typeGroup(this.type, data.meta.ajax, data.meta.json);
        this.method = trackerService.method(data.meta.method);
        this.path = trackerService.path(data.meta.path);
        this.status = trackerService.status(data.meta.status);
        this.statusGroup = trackerService.statusGroup(this.status, this.type);
        this.statusColor = trackerService.statusColor(this.statusGroup);

        this.application = new Application(data.data.application);
        this.config = data.data.config || {};
        this.serviceProviders = data.data.service_providers || [];
        this.bindings = (data.data.bindings || []).map(binding => new Binding(binding));
        this.paths = (data.data.paths || []).map(path => new Path(path));

        this.request = trackerService.request(data.meta, data.data.request);
        this.response = trackerService.response(data.meta.type);
        this.route = trackerService.route(data.meta, data.data.route);
        this.session = data.data.session || {};

        this.lastActiveDetailsTab = 0;
    }

    countConfig() {
        return Object.keys(this.config).length;
    }

    hasConfig() {
        return !! this.countConfig();
    }

    countServiceProviders() {
        return this.serviceProviders.length;
    }

    hasServiceProviders() {
        return !! this.countServiceProviders();
    }

    countBindings() {
        return this.bindings.length;
    }

    hasBindings() {
        return !! this.countBindings();
    }

    countPaths() {
        return this.paths.length;
    }

    hasPaths() {
        return !! this.countPaths();
    }

    countSession() {
        return Object.keys(this.session).length;
    }

    hasSession() {
        return !! this.countSession();
    }
}

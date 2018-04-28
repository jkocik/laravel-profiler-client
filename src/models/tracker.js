import Binding from './binding';
import { trackerService } from './../services/tracker.model.service';

export default class Tracker {
    constructor(data) {
        this.executionTimeAt = trackerService.executionTimeAt(data.meta.execution_time_at);
        this.id = data.meta.id;
        this.version = data.meta.version;
        this.env = data.meta.env;
        this.running = trackerService.running(data.meta.is_running_in_console);
        this.method = trackerService.method(data.meta.method);
        this.http = trackerService.http(data.meta.is_ajax);
        this.status = trackerService.status(data.meta.status);
        this.statusGroup = trackerService.statusGroup(data.meta.status);
        this.statusColor = trackerService.statusColor(data.meta.status);
        this.path = trackerService.path(data.meta.path);

        this.bindings = (data.data.bindings || []).map(binding => new Binding(binding));
    }
}

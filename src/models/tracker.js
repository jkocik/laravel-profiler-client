import Binding from './binding';
import { statusService } from './../services/status.service';

export default class Tracker {
    constructor(data) {
        this.id = data.meta.id;
        this.version = data.meta.version;
        this.env = data.meta.env;
        this.running = data.meta.is_running_in_console ? 'console' : 'web';
        this.method = data.meta.method;
        this.http = data.meta.is_ajax ? 'ajax' : 'regular';
        this.status = data.meta.status;
        this.statusGroup = statusService.statusGroup(data.meta.status);
        this.path = data.meta.path;

        this.bindings = (data.data.bindings || []).map(binding => new Binding(binding));
    }
}

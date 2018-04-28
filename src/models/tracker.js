import moment from 'moment';
import Binding from './binding';
import { ajaxService } from './../services/ajax.service';
import { statusService } from './../services/status.service';

export default class Tracker {
    constructor(data) {
        this.executionTimeAt = moment.unix(data.meta.execution_time_at).format('HH:mm:ss');
        this.id = data.meta.id;
        this.version = data.meta.version;
        this.env = data.meta.env;
        this.running = data.meta.is_running_in_console ? 'console' : 'web';
        this.method = data.meta.method || 'x';
        this.http = ajaxService.ajax(data.meta.is_ajax);
        this.status = data.meta.status || 'x';
        this.statusGroup = statusService.group(data.meta.status);
        this.statusColor = statusService.color(data.meta.status);
        this.path = data.meta.path || 'x';

        this.bindings = (data.data.bindings || []).map(binding => new Binding(binding));
    }
}

import Binding from './binding';

export default class Tracker {
    constructor(data) {
        this.id = data.meta.id;
        this.version = data.meta.version;
        this.env = data.meta.env;
        this.running = data.meta.is_running_in_console ? 'console' : 'web';
        this.method = data.meta.method;
        this.http = data.meta.is_ajax ? 'ajax' : 'regular';

        this.bindings = (data.data.bindings || []).map(binding => new Binding(binding));
    }
}

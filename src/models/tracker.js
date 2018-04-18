import Binding from './binding';

export default class Tracker {
    constructor(data) {
        this.id = data.meta.id;
        this.version = data.meta.version;
        this.env = data.meta.env;

        this.bindings = (data.data.bindings || []).map(binding => new Binding(binding));
    }
}

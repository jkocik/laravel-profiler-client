export default class Tracker {
    constructor(data) {
        this.id = data.meta.id;
        this.version = data.meta.version;
        this.env = data.meta.env;
    }
}

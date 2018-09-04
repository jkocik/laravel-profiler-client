import DBBase from './db-base';

export default class DBQuery extends DBBase {
    constructor(data, index) {
        super(data, index);
        this.query = data.query;
        this.sql = data.sql;
        this.bindings = data.bindings;
        this.time = data.time;
    }

    hasFullDetails() {
        return true;
    }

    get timeForHuman() {
        return `${this.time.toFixed(2)}ms`;
    }

    get class() {
        return 'has-text-info';
    }
}

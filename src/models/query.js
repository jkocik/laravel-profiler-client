export default class Query {
    constructor(data, index) {
        this.index = index;
        this.database = data.database;
        this.name = data.name;
        this.query = data.query;
        this.sql = data.sql;
        this.bindings = data.bindings;
        this.time = data.time;
    }

    get timeForHuman() {
        return `${this.time.toFixed(2)}ms`;
    }
}

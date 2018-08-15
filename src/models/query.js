export default class Query {
    constructor(data) {
        this.database = data.database;
        this.name = data.name;
        this.query = data.query;
        this.sql = data.sql;
        this.bindings = data.bindings;
        this.time = data.time;
    }
}

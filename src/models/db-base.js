export default class DBBase {
    constructor(data, index) {
        this.index = index;
        this.type = data.type;
        this.database = data.database;
        this.name = data.name;
    }

    hasFullDetails() {
        return false;
    }
}

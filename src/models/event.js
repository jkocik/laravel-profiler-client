export default class Event {
    constructor(data, index) {
        this.index = index;
        this.name = data.name;
        this.data = data.data || null;
        this.count = data.count;
    }

    hasDetails() {
        return this.data !== null;
    }

    isGrouped() {
        return this.count > 1;
    }
}

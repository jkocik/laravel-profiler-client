export default class View {
    constructor(data, index) {
        this.index = index;
        this.name = data.name;
        this.path = data.path;
        this.data = data.data || null;
    }

    get label() {
        return `${this.name} (${this.path})`;
    }

    hasDetails() {
        return this.data !== null;
    }
}

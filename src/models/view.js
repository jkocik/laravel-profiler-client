export default class View {
    constructor(data) {
        this.name = data.name;
        this.path = data.path;
        this.data = data.data;
    }

    get label() {
        return `${this.name} (${this.path})`;
    }
}

export default class Path {
    constructor(data) {
        this.name = data.name;
        this.path = data.path;
    }

    get nameForHuman() {
        return this.name.replace(/_/g, ' ');
    }
}

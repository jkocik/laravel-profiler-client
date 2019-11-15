export default class RedisCommand {
    constructor(data) {
        this.command = data.command;
        this.name = data.name;
        this.parameters = data.parameters;
        this.time = data.time;
    }

    get timeForHuman() {
        return `${this.time.toFixed(2)}ms`;
    }
}

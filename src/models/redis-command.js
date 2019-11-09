export default class RedisCommand {
    constructor(data) {
        this.command = data.command;
        this.name = data.name;
        this.parameters = data.parameters;
        this.time = data.time;
    }
}

import { BaseRequest } from './base-request';

export default class ConsoleFinishedRequest extends BaseRequest {
    constructor(meta, request) {
        super();
        this.arguments = request.arguments;
        this.options = request.options;
    }

    isConsoleFinishedRequest() {
        return true;
    }

    get name() {
        return 'console-finished-request';
    }

    get enabled() {
        return true;
    }
}

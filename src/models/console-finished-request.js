import { BaseRequest } from './base-request';

export default class ConsoleFinishedRequest extends BaseRequest {
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

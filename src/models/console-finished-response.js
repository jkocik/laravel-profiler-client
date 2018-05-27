import { BaseResponse } from './base-response';

export default class ConsoleFinishedResponse extends BaseResponse {
    isConsoleFinishedResponse() {
        return true;
    }

    get name() {
        return 'console-finished-response';
    }

    get enabled() {
        return true;
    }
}

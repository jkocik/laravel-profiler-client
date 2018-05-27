import { BaseRequest } from './base-request';

export default class ConsoleStartingRequest extends BaseRequest {
    get name() {
        return 'console-starting-request';
    }
}

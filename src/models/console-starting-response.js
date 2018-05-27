import { BaseResponse } from './base-response';

export default class ConsoleStartingResponse extends BaseResponse {
    get name() {
        return 'console-starting-response';
    }
}

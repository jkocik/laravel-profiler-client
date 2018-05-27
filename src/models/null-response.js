import { BaseResponse } from './base-response';

export default class NullResponse extends BaseResponse {
    get name() {
        return 'null-response';
    }
}

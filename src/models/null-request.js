import { BaseRequest } from './base-request';

export default class NullRequest extends BaseRequest {
    get name() {
        return 'null-request';
    }
}

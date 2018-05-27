import { BaseRequest } from './base-request';

export default class HttpRequest extends BaseRequest {
    isHttpRequest() {
        return true;
    }

    get name() {
        return 'http-request';
    }

    get enabled() {
        return true;
    }
}

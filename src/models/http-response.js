import { BaseResponse } from './base-response';

export default class HttpResponse extends BaseResponse {
    isHttpResponse() {
        return true;
    }

    get name() {
        return 'http-response';
    }

    get enabled() {
        return true;
    }
}

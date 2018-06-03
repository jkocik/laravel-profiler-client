import { BaseResponse } from './base-response';
import { httpResponseService } from './../services/http-response.model.service';

export default class HttpResponse extends BaseResponse {
    constructor(response) {
        super();
        this.content = response.content;
        this.headers = response.headers;
        try {
            this.json = httpResponseService.json(response.content);
        } catch (e) {}
    }

    hasContent() {
        return !! this.content.length;
    }

    isJson() {
        return this.hasOwnProperty('json');
    }

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

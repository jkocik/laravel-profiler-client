import { BaseResponse } from './base-response';
import { httpResponseService } from './../services/http-response.model.service';

export default class HttpResponse extends BaseResponse {
    constructor(response, content) {
        super();
        this.content = content;
        this.headers = response.headers;
        try {
            this.json = httpResponseService.json(content);
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

import { BaseRequest } from './base-request';

export default class HttpRequest extends BaseRequest {
    constructor(meta, request) {
        super();
        this.ajax = meta.ajax;
        this.json = meta.json;
        this.pjax = request.pjax;
        this.ip = request.ip;
        this.url = request.url;
        this.query = request.query;
        this.server = request.server;
        this.header = request.header;
        this.input = request.input;
        this.files = request.files;
        this.cookie = request.cookie;
    }

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

import { BaseRequest } from './base-request';

export default class HttpRequest extends BaseRequest {
    constructor(meta, request, server) {
        super();
        this.ajax = meta.ajax;
        this.json = meta.json;
        this.pjax = request.pjax;
        this.ip = request.ip;
        this.url = request.url;
        this.query = request.query;
        this.header = request.header;
        this.input = request.input;
        this.files = request.files;
        this.cookie = request.cookie;
        this.server = server;
    }

    serverForTable() {
        return Object.entries(this.server);
    }

    countInput() {
        return Object.keys(this.input).length + Object.keys(this.files).length;
    }

    hasInput() {
        return !! this.countInput();
    }

    isHttpRequest() {
        return true;
    }

    hasServer() {
        return !! this.serverForTable().length;
    }

    get name() {
        return 'http-request';
    }

    get enabled() {
        return true;
    }
}

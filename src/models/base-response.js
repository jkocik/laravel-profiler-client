export class BaseResponse {
    isHttpResponse() {
        return false;
    }

    isConsoleFinishedResponse() {
        return false;
    }

    get enabled() {
        return false;
    }
}

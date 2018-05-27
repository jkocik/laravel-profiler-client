export class BaseRequest {
    isHttpRequest() {
        return false;
    }

    isConsoleFinishedRequest() {
        return false;
    }
}

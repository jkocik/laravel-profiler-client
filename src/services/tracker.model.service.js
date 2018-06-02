import moment from 'moment';
import NullRoute from './../models/null-route';
import HttpRoute from './../models/http-route';
import NullRequest from './../models/null-request';
import HttpRequest from './../models/http-request';
import NullResponse from './../models/null-response';
import HttpResponse from './../models/http-response';
import ConsoleStartingRequest from './../models/console-starting-request';
import ConsoleFinishedRequest from './../models/console-finished-request';
import ConsoleStartingResponse from './../models/console-starting-response';
import ConsoleFinishedResponse from './../models/console-finished-response';

const missing = '---';

export const trackerService = {
    executionAt(executionAt) {
        return moment.unix(executionAt).format('HH:mm:ss');
    },

    running(isRunningInConsole) {
        return isRunningInConsole ? 'console' : 'web';
    },

    type(type) {
        return ['http', 'command'].find((item) => {
            return type && type.split('-')[0] === item;
        }) || missing;
    },

    typeGroup(resolvedType, ajax, json) {
        if (resolvedType !== 'http') {
            return resolvedType;
        }

        const http = {
            http: true,
            ajax,
            json,
        };

        return Object.keys(http).filter(key => http[key]).join(' / ');
    },

    method(method) {
        return method || missing;
    },

    path(path) {
        return path || missing;
    },

    status(resolvedType, status) {
        if (resolvedType === missing) {
            return missing;
        }

        if (! status && status !== 0) {
            return missing;
        }

        return status;
    },

    statusGroup(resolvedStatus, resolvedType) {
        if (resolvedStatus === missing) {
            return missing;
        }

        if (resolvedType === 'command') {
            return 'exitCode';
        }

        const group = [2, 3, 4, 5].find((item) => {
            return item === Math.floor(resolvedStatus / 100);
        }) || '?';

        return `${group}xx`;
    },

    statusColor(resolvedStatusGroup) {
        const colors = {
            '2xx': 'is-success',
            '3xx': 'is-primary',
            '4xx': 'is-warning',
            '5xx': 'is-danger',
            '?xx': 'is-light',
            [missing]: 'is-light',
            'exitCode': 'is-dark',
        };

        return colors[resolvedStatusGroup];
    },

    request(meta, request) {
        const Request = {
            'http': HttpRequest,
            'command-starting': ConsoleStartingRequest,
            'command-finished': ConsoleFinishedRequest,
        }[meta.type] || NullRequest;

        return new Request(meta, request);
    },

    response(type) {
        const Response = {
            'http': HttpResponse,
            'command-starting': ConsoleStartingResponse,
            'command-finished': ConsoleFinishedResponse,
        }[type] || NullResponse;

        return new Response();
    },

    route(meta, route) {
        if (! route || Array.isArray(route)) {
            return new NullRoute();
        }

        const Route = {
            'http': HttpRoute,
        }[meta.type] || NullRoute;

        return new Route(route);
    },
};

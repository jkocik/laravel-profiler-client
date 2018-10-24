import moment from 'moment';
import DBQuery from './../models/db-query';
import NullRoute from './../models/null-route';
import HttpRoute from './../models/http-route';
import NullRequest from './../models/null-request';
import HttpRequest from './../models/http-request';
import NullResponse from './../models/null-response';
import HttpResponse from './../models/http-response';
import HttpPerformance from './../models/http-performance';
import ConsolePerformance from './../models/console-performance';
import DBTransactionBegin from './../models/db-transaction-begin';
import DBTransactionCommit from './../models/db-transaction-commit';
import DBTransactionRollback from './../models/db-transaction-rollback';
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

    statusText(statusText) {
        return statusText || missing;
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

    performance(meta, data) {
        const Performance = {
            'http': HttpPerformance,
        }[meta.type] || ConsolePerformance;

        return new Performance(data.performance);
    },

    request(meta, data) {
        const Request = {
            'http': HttpRequest,
            'command-starting': ConsoleStartingRequest,
            'command-finished': ConsoleFinishedRequest,
        }[meta.type] || NullRequest;

        const server = data.server || {};

        return new Request(meta, data.request, server);
    },

    response(type, data) {
        const Response = {
            'http': HttpResponse,
            'command-starting': ConsoleStartingResponse,
            'command-finished': ConsoleFinishedResponse,
        }[type] || NullResponse;

        const content = data.content || '';

        return new Response(data.response, content);
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

    sessionProvided(data) {
        return data.hasOwnProperty('session');
    },

    viewsProvided(data) {
        return data.hasOwnProperty('views');
    },

    eventsProvided(data) {
        return data.hasOwnProperty('events');
    },

    query(query, index) {
        const Query = {
            'query': DBQuery,
            'transaction-begin': DBTransactionBegin,
            'transaction-commit': DBTransactionCommit,
            'transaction-rollback': DBTransactionRollback,
        }[query.type];

        return new Query(query, index);
    },

    queriesProvided(data) {
        return data.hasOwnProperty('queries');
    },

    queriesExecutionTime(queries) {
        return queries.filter(query => query.type === 'query').reduce((total, query) => {
            return total + query.time;
        }, 0);
    },

    authProvided(data) {
        return data.hasOwnProperty('auth');
    },

    exceptionProvided(data) {
        return data.hasOwnProperty('exception');
    },
};

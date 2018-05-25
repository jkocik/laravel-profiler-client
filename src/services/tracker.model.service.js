import moment from 'moment';

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

    status(status) {
        return status || missing;
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
};

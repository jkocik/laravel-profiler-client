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
        return type || missing;
    },

    method(method) {
        return method || missing;
    },

    status(status) {
        return status || missing;
    },

    statusGroup(status, type) {
        if (! status) {
            return missing;
        }

        if (type === 'command') {
            return 'exitCode';
        }

        const group = [2, 3, 4, 5].find((item) => {
            return item === Math.floor(status / 100);
        }) || '?';

        return `${group}xx`;
    },

    statusColor(status, type) {
        const colors = {
            '2xx': 'is-success',
            '3xx': 'is-primary',
            '4xx': 'is-warning',
            '5xx': 'is-danger',
            '?xx': 'is-light',
            [missing]: 'is-light',
            'exitCode': 'is-dark',
        };

        return colors[this.statusGroup(status, type)];
    },

    path(path) {
        return path || missing;
    },
};

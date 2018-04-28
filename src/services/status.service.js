export const statusService = {
    group(status) {
        const group = [2, 3, 4, 5].find((item) => {
            return item === Math.floor(status / 100);
        }) || '?';

        return status ? `${group}xx` : 'x';
    },

    color(status) {
        const colors = {
            '2xx': 'is-success',
            '3xx': 'is-dark',
            '4xx': 'is-warning',
            '5xx': 'is-danger',
            '?xx': 'is-light',
            'x': 'is-light',
        };

        return colors[this.group(status)];
    },
};

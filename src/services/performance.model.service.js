export const performanceService = {
    memoryInMB(memory) {
        return {
            peak: (memory.peak / 1024 / 1024).toFixed(2),
        };
    },

    httpSummaryInSeconds(timer) {
        const summary = {
            laravel: timer.laravel,
            boot: timer.boot,
        };

        if (timer.middleware && timer.request) {
            summary.middleware = timer.middleware;
            summary.request = timer.request;
        }

        if (! summary.middleware && ! summary.request) {
            summary.totalRequest = timer['total-request'];
        }

        summary.response = timer.response;

        return this.toSeconds(summary);
    },

    customInSeconds(timer) {
        const keys = Object.keys(timer).filter((key) => {
            return key.startsWith('custom-');
        });

        return keys;
    },

    toSeconds(milliseconds) {
        return Object.keys(milliseconds).reduce((seconds, key) => {
            seconds[key] = (milliseconds[key] / 1000).toFixed(3);
            return seconds;
        }, {});
    },
};

export const performanceService = {
    memoryInMB(memory) {
        return {
            peak: (memory.peak / 1024 / 1024).toFixed(2),
        };
    },

    summaryInSeconds(timer) {
        const summary = {
            laravel: (timer.laravel / 1000).toFixed(3),
            boot: (timer.boot / 1000).toFixed(3),
        };

        if (timer.middleware && timer.request) {
            summary.middleware = (timer.middleware / 1000).toFixed(3);
            summary.request = (timer.request / 1000).toFixed(3);
        }

        if (! summary.middleware && ! summary.request && timer['total-request']) {
            summary.totalRequest = (timer['total-request'] / 1000).toFixed(3);
        }

        if (timer.response) {
            summary.response = (timer.response / 1000).toFixed(3);
        }

        return summary;
    },

    customInSeconds(timer) {
        const keys = Object.keys(timer).filter((key) => {
            return key.startsWith('custom-');
        });

        return keys;
    },
};

export const performanceService = {
    memoryInMB(memory) {
        return {
            peak: (memory.peak / 1024 / 1024).toFixed(2),
        };
    },

    laravelInSeconds(timer) {
        return (timer.laravel / 1000).toFixed(3);
    },

    httpSummaryInSeconds(timer) {
        const summary = {
            boot: timer.boot,
        };

        if (timer.middleware && timer.request) {
            summary.middleware = timer.middleware;
            summary.request = timer.request;
        }

        if (! summary.middleware && ! summary.request) {
            summary.request = timer['total-request'];
        }

        summary.response = timer.response;

        return this.toSeconds(summary, this.laravelInSeconds(timer));
    },

    consoleSummaryInSeconds(timer) {
        const summary = {
            boot: timer.boot,
        };

        return this.toSeconds(summary, this.laravelInSeconds(timer));
    },

    customInSeconds(timer) {
        const keys = Object.keys(timer).filter((key) => {
            return key.startsWith('custom-');
        });

        return keys;
    },

    toSeconds(milliseconds, laravelInSeconds) {
        const seconds = Object.keys(milliseconds).reduce((seconds, key) => {
            seconds[key] = (milliseconds[key] / 1000).toFixed(3);
            return seconds;
        }, {});

        const sum = Object.keys(seconds).reduce((sum, key) => {
            sum += parseFloat(seconds[key]);
            return sum;
        }, 0);

        seconds.other = (parseFloat(laravelInSeconds) - sum).toFixed(3);

        return seconds;
    },
};

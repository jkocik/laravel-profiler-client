export const performanceService = {
    memoryInMB(memory) {
        return {
            peak: (memory.peak / 1024 / 1024).toFixed(2),
        };
    },

    laravelInSeconds(timer) {
        return Math.ceil(timer.laravel) / 1000;
    },

    httpSummaryInSeconds(timer) {
        const summary = {
            boot: timer.boot,
        };

        [
            'route',
            'setup',
            'middleware',
            'request',
        ].filter(item => !! timer[item]).forEach((item) => {
            summary[item] = timer[item];
        });

        summary.response = timer.response;

        return this.toSeconds(summary, this.laravelInSeconds(timer));
    },

    consoleSummaryInSeconds(timer) {
        const summary = {
            boot: timer.boot,
        };

        return this.toSeconds(summary, this.laravelInSeconds(timer));
    },

    queriesInSeconds(queriesExecutionTime, timer) {
        const queries = {
            queries: queriesExecutionTime,
        };

        return this.toSeconds(queries, this.laravelInSeconds(timer));
    },

    customInSeconds(timer) {
        const keys = Object.keys(timer).filter((key) => {
            return key.startsWith('custom-');
        });

        return keys;
    },

    toSeconds(milliseconds, laravelInSeconds) {
        let sum = 0;
        const secondsFloor = Object.keys(milliseconds).reduce((secondsFloor, key) => {
            secondsFloor[key] = Math.floor(milliseconds[key]);
            sum += secondsFloor[key];
            return secondsFloor;
        }, {});

        secondsFloor.other = laravelInSeconds * 1000 - sum;

        return Object.keys(secondsFloor).reduce((secondsFixed, key) => {
            secondsFixed[key] = (secondsFloor[key] / 1000).toFixed(3);
            return secondsFixed;
        }, {});
    },
};

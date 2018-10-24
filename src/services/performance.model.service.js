export const performanceService = {
    memoryInMB(memory) {
        return {
            peak: (memory.peak / 1024 / 1024).toFixed(2),
        };
    },

    summaryInSeconds(timer) {
        return {
            laravel: (timer.laravel / 1000).toFixed(2),
        };
    },

    customInSeconds(timer) {
        const keys = Object.keys(timer).filter((key) => {
            return key.startsWith('custom-');
        });

        return keys;
    },
};

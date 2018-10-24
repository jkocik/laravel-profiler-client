export const performanceService = {
    memoryInMB(memory) {
        return {
            peak: (memory.peak / 1024 / 1024).toFixed(2),
        };
    },

    timerInSeconds(timer) {
        return {
            laravel: (timer.laravel / 1000).toFixed(2),
        };
    },
};

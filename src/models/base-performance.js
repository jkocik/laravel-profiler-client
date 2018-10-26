import { performanceService } from './../services/performance.model.service';

export class BasePerformance {
    constructor(performance) {
        this.memory = performanceService.memoryInMB(performance.memory);
        this.laravel = performanceService.laravelInSeconds(performance.timer);
        this.summary = performanceService.httpSummaryInSeconds(performance.timer);
        this.custom = performanceService.customInSeconds(performance.timer);
    }

    hasCustom() {
        return !! this.custom.length;
    }

    get memoryPeakForHuman() {
        return `${this.memory.peak}MB`;
    }

    get laravelTimeForHuman() {
        return `${parseFloat(this.laravel).toFixed(2)}s`;
    }

    get summaryTable() {
        return Object.keys(this.summary).map((key) => {
            return {
                label: key,
                item: `${this.summary[key]}s`,
            };
        });
    }
}

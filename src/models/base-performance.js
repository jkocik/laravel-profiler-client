import { performanceService } from './../services/performance.model.service';

export class BasePerformance {
    constructor(performance) {
        this.memory = performanceService.memoryInMB(performance.memory);
        this.summary = performanceService.summaryInSeconds(performance.timer);
        this.custom = performanceService.customInSeconds(performance.timer);
    }

    hasCustom() {
        return !! this.custom.length;
    }

    get memoryPeakForHuman() {
        return `${this.memory.peak}MB`;
    }

    get summaryLaravelForHuman() {
        return `${this.summary.laravel}s`;
    }
}

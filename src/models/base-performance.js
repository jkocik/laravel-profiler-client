import { performanceService } from './../services/performance.model.service';

export class BasePerformance {
    constructor(performance) {
        this.memory = performanceService.memoryInMB(performance.memory);
        this.timer = performanceService.timerInSeconds(performance.timer);
    }

    get memoryPeakForHuman() {
        return `${this.memory.peak}MB`;
    }

    get timerLaravelForHuman() {
        return `${this.timer.laravel}s`;
    }
}

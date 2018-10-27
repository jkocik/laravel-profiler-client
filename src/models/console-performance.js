import { BasePerformance } from './base-performance';
import { performanceService } from './../services/performance.model.service';

export default class ConsolePerformance extends BasePerformance {
    constructor(performance) {
        super(performance);
        this.summary = performanceService.consoleSummaryInSeconds(performance.timer);
    }
}

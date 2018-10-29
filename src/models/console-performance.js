import { BasePerformance } from './base-performance';
import { performanceService } from './../services/performance.model.service';

export default class ConsolePerformance extends BasePerformance {
    constructor(performance, queriesExecutionTime) {
        super(performance, queriesExecutionTime);
        this.summary = performanceService.consoleSummaryInSeconds(performance.timer);
        this.summaryColors = {
            boot: 'rgb(75, 192, 192)',
            command: 'hsl(0, 0%, 29%)',
            other: 'hsl(0, 0%, 86%)',
        };
    }
}

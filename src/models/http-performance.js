import { BasePerformance } from './base-performance';
import { performanceService } from './../services/performance.model.service';

export default class HttpPerformance extends BasePerformance {
    constructor(performance, queriesExecutionTime, redisExecutionTime) {
        super(performance, queriesExecutionTime, redisExecutionTime);
        this.summary = performanceService.httpSummaryInSeconds(performance.timer);
        this.summaryColors = {
            boot: 'rgb(75, 192, 192)',
            route: 'rgb(255, 205, 86)',
            setup: 'hsl(0, 0%, 29%)',
            middleware: 'rgb(54, 162, 235)',
            request: '#f87979',
            response: 'rgb(153, 102, 255)',
            other: 'hsl(0, 0%, 86%)',
        };
    }
}

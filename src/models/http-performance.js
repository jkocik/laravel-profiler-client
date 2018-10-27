import { BasePerformance } from './base-performance';
import { performanceService } from './../services/performance.model.service';

export default class HttpPerformance extends BasePerformance {
    constructor(performance) {
        super(performance);
        this.summary = performanceService.httpSummaryInSeconds(performance.timer);
        this.colors = {
            boot: 'rgb(75, 192, 192)',
            middleware: 'rgb(54, 162, 235)',
            request: '#f87979',
            response: 'rgb(153, 102, 255)',
            other: 'white',
        };
    }
}

import { performanceService } from './../services/performance.model.service';

export class BasePerformance {
    constructor(performance) {
        this.memory = performanceService.memoryInMB(performance.memory);
        this.laravel = performanceService.laravelInSeconds(performance.timer);
        this.custom = performanceService.customInSeconds(performance.timer);
    }

    get memoryPeakForHuman() {
        return `${this.memory.peak}MB`;
    }

    get laravelTimeForHuman() {
        return `${parseFloat(this.laravel).toFixed(2)}s`;
    }

    hasCustom() {
        return !! this.custom.length;
    }

    summaryTableData() {
        return Object.keys(this.summary).map((key) => {
            return {
                label: key,
                item: `${this.summary[key]}s`,
                color: this.colors[key],
            };
        });
    }

    summaryChartData() {
        return {
            labels: Object.keys(this.summary),
            datasets: [
                {
                    data: Object.values(this.summary),
                    backgroundColor: Object.keys(this.summary).map(key => this.colors[key]),
                },
            ],
        };
    }
}

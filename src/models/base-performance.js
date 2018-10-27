import { performanceService } from './../services/performance.model.service';

export class BasePerformance {
    constructor(performance, queriesExecutionTime) {
        this.memory = performanceService.memoryInMB(performance.memory);
        this.laravel = performanceService.laravelInSeconds(performance.timer);
        this.custom = performanceService.customInSeconds(performance.timer);
        this.queries = performanceService.queriesInSeconds(queriesExecutionTime, performance.timer);
        this.queriesColors = {
            queries: '#f87979',
            other: 'white',
        };
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

    hasQueries() {
        return parseFloat(this.queries.queries) !== 0;
    }

    summaryTableData() {
        return Object.keys(this.summary).map((key) => {
            return {
                label: key,
                item: `${this.summary[key]}s`,
                color: this.summaryColors[key],
            };
        });
    }

    summaryChartData() {
        return {
            labels: Object.keys(this.summary),
            datasets: [
                {
                    data: Object.values(this.summary),
                    backgroundColor: Object.keys(this.summary).map(key => this.summaryColors[key]),
                },
            ],
        };
    }

    queriesTableData() {
        return Object.keys(this.queries).map((key) => {
            return {
                label: key,
                item: `${this.queries[key]}s`,
                color: this.queriesColors[key],
            };
        });
    }

    queriesChartData() {
        return {
            labels: Object.keys(this.queries),
            datasets: [
                {
                    data: Object.values(this.queries),
                    backgroundColor: Object.keys(this.queries).map(key => this.queriesColors[key]),
                },
            ],
        };
    }
}

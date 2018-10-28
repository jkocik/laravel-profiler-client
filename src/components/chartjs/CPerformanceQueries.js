import { Doughnut } from 'vue-chartjs';
import Tracker from './../../models/tracker';

export default {
    name: 'chart-performance-queries',
    extends: Doughnut,
    props: {
        tracker: Tracker,
    },
    mounted() {
        this.renderChart(this.tracker.performance.queriesChartData(), this.options);
    },
    data() {
        return {
            options: {
                legend: {
                    display: false,
                },
                animation: {
                    duration: 0,
                },
            },
        };
    },
};

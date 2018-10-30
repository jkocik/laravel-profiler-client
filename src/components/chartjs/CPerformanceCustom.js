import { HorizontalBar } from 'vue-chartjs';
import Tracker from './../../models/tracker';

export default {
    name: 'chart-performance-custom',
    extends: HorizontalBar,
    props: {
        tracker: Tracker,
    },
    mounted() {
        this.renderChart(this.tracker.performance.customChartData(), this.options);
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
                maintainAspectRatio: false,
            },
        };
    },
};

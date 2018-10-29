import Tracker from '@/models/tracker';
import ConsolePerformance from '@/models/console-performance';
import { trackerFactory, mountWithTracker } from './../test-helper';
import TabPerformanceSummary from '@/components/dashboard/details/TabPerformanceSummary';

describe('ConsolePerformance Model', () => {
    let trackerSource;

    beforeEach(() => {
        trackerSource = trackerFactory.create('data.performance', {
            memory: {
                peak: 1048576,
            },
            timer: {
                laravel: 350,
                boot: 1,
                command: 200,
                'custom-time': 100,
            },
        });
    });

    it('has boot time', () => {
        let performance = new ConsolePerformance(trackerSource.data.performance);

        expect(performance.summary.boot).to.equal('0.001');
    });

    it('has command time', () => {
        let performance = new ConsolePerformance(trackerSource.data.performance);

        expect(performance.summary.command).to.equal('0.200');
    });

    it('has not command time if command is not delivered', () => {
        delete trackerSource.data.performance.timer.command;
        let performance = new ConsolePerformance(trackerSource.data.performance);

        expect(performance.summary.command).to.be.undefined;
    });

    it('has time of other actions', () => {
        let performance = new ConsolePerformance(trackerSource.data.performance);

        expect(performance.summary.other).to.equal('0.149');
    });

    it('has related summary chart data with summary legend data', () => {
        let trackerSource = trackerFactory.create();
        let performance = new ConsolePerformance(trackerSource.data.performance);
        let wrapper = mountWithTracker(TabPerformanceSummary, new Tracker(trackerSource));

        let summaryLegend = performance.summaryLegendData(wrapper.vm.$t);
        let summaryChart = performance.summaryChartData(wrapper.vm.$t);

        expect(summaryChart.labels.length).to.equal(2);
        expect(summaryChart.labels.length).to.equal(summaryLegend.length);

        expect(summaryChart.labels[0]).to.equal(summaryLegend[0].label);
        expect(summaryChart.labels[1]).to.equal(summaryLegend[1].label);

        expect(summaryChart.datasets[0].data.length).to.equal(2);
        expect(summaryChart.datasets[0].data).to.deep.equal(Object.values(performance.summary));

        expect(summaryChart.datasets[0].backgroundColor.length).to.equal(2);
        expect(summaryChart.datasets[0].backgroundColor[0]).to.equal(summaryLegend[0].color);
        expect(summaryChart.datasets[0].backgroundColor[1]).to.equal(summaryLegend[1].color);
    });

    it('has related summary chart data with summary legend data if less times are provided', () => {
        trackerSource = trackerFactory.create('data.performance', {
            memory: {
                peak: 1048576,
            },
            timer: {
                laravel: 350,
                boot: 1,
            },
        });
        let performance = new ConsolePerformance(trackerSource.data.performance);
        let wrapper = mountWithTracker(TabPerformanceSummary, new Tracker(trackerSource));

        let summaryLegend = performance.summaryLegendData(wrapper.vm.$t);
        let summaryChart = performance.summaryChartData(wrapper.vm.$t);

        expect(summaryChart.labels.length).to.equal(2);
        expect(summaryChart.labels.length).to.equal(summaryLegend.length);

        expect(summaryChart.labels[0]).to.equal(summaryLegend[0].label);
        expect(summaryChart.labels[1]).to.equal(summaryLegend[1].label);

        expect(summaryChart.datasets[0].data.length).to.equal(2);
        expect(summaryChart.datasets[0].data).to.deep.equal(Object.values(performance.summary));

        expect(summaryChart.datasets[0].backgroundColor.length).to.equal(2);
        expect(summaryChart.datasets[0].backgroundColor[0]).to.equal(summaryLegend[0].color);
        expect(summaryChart.datasets[0].backgroundColor[1]).to.equal(summaryLegend[1].color);
    });
});

import Tracker from '@/models/tracker';
import HttpPerformance from '@/models/http-performance';
import { trackerFactory, mountWithTracker } from './../test-helper';
import TabPerformanceSummary from '@/components/dashboard/details/TabPerformanceSummary';

describe('HttpPerformance Model', () => {
    let trackerSource;

    beforeEach(() => {
        trackerSource = trackerFactory.create('data.performance', {
            memory: {
                peak: 1048576,
            },
            timer: {
                laravel: 350,
                boot: 1,
                route: 2,
                middleware: 3,
                request: 104,
                response: 5,
                'custom-time': 100,
            },
        });
    });

    it('has boot time', () => {
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.boot).to.equal('0.001');
    });

    it('has route time', () => {
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.route).to.equal('0.002');
    });

    it('has not route time if route is not delivered', () => {
        delete trackerSource.data.performance.timer.route;
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.route).to.be.undefined;
    });

    it('has setup time', () => {
        trackerSource.data.performance.timer.setup = 99;
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.setup).to.equal('0.099');
    });

    it('has not setup time if setup is not delivered', () => {
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.setup).to.be.undefined;
    });

    it('has middleware time', () => {
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.middleware).to.equal('0.003');
    });

    it('has not middleware time if middleware is not delivered', () => {
        delete trackerSource.data.performance.timer.middleware;
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.middleware).to.be.undefined;
    });

    it('has request time', () => {
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.request).to.equal('0.104');
    });

    it('has not request time if request is not delivered', () => {
        delete trackerSource.data.performance.timer.request;
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.request).to.be.undefined;
    });

    it('has response time', () => {
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.response).to.equal('0.005');
    });

    it('has time of other actions', () => {
        let performance = new HttpPerformance(trackerSource.data.performance);

        expect(performance.summary.other).to.equal('0.235');
    });

    it('has related summary chart data with summary legend data', () => {
        let trackerSource = trackerFactory.create();
        let performance = new HttpPerformance(trackerSource.data.performance);
        let wrapper = mountWithTracker(TabPerformanceSummary, new Tracker(trackerSource));

        let summaryLegend = performance.summaryLegendData(wrapper.vm.$t);
        let summaryChart = performance.summaryChartData(wrapper.vm.$t);

        expect(summaryChart.labels.length).to.equal(6);
        expect(summaryChart.labels.length).to.equal(summaryLegend.length);

        expect(summaryChart.labels[0]).to.equal(summaryLegend[0].label);
        expect(summaryChart.labels[1]).to.equal(summaryLegend[1].label);
        expect(summaryChart.labels[2]).to.equal(summaryLegend[2].label);
        expect(summaryChart.labels[3]).to.equal(summaryLegend[3].label);
        expect(summaryChart.labels[4]).to.equal(summaryLegend[4].label);
        expect(summaryChart.labels[5]).to.equal(summaryLegend[5].label);

        expect(summaryChart.datasets[0].data.length).to.equal(6);
        expect(summaryChart.datasets[0].data).to.deep.equal(Object.values(performance.summary));

        expect(summaryChart.datasets[0].backgroundColor.length).to.equal(6);
        expect(summaryChart.datasets[0].backgroundColor[0]).to.equal(summaryLegend[0].color);
        expect(summaryChart.datasets[0].backgroundColor[1]).to.equal(summaryLegend[1].color);
        expect(summaryChart.datasets[0].backgroundColor[2]).to.equal(summaryLegend[2].color);
        expect(summaryChart.datasets[0].backgroundColor[3]).to.equal(summaryLegend[3].color);
        expect(summaryChart.datasets[0].backgroundColor[4]).to.equal(summaryLegend[4].color);
        expect(summaryChart.datasets[0].backgroundColor[5]).to.equal(summaryLegend[5].color);
    });

    it('has related summary chart data with summary legend data if less times are provided', () => {
        trackerSource = trackerFactory.create('data.performance', {
            memory: {
                peak: 1048576,
            },
            timer: {
                laravel: 350,
                boot: 1,
                response: 5,
            },
        });
        let performance = new HttpPerformance(trackerSource.data.performance);
        let wrapper = mountWithTracker(TabPerformanceSummary, new Tracker(trackerSource));

        let summaryLegend = performance.summaryLegendData(wrapper.vm.$t);
        let summaryChart = performance.summaryChartData(wrapper.vm.$t);

        expect(summaryChart.labels.length).to.equal(3);
        expect(summaryChart.labels.length).to.equal(summaryLegend.length);

        expect(summaryChart.labels[0]).to.equal(summaryLegend[0].label);
        expect(summaryChart.labels[1]).to.equal(summaryLegend[1].label);
        expect(summaryChart.labels[2]).to.equal(summaryLegend[2].label);

        expect(summaryChart.datasets[0].data.length).to.equal(3);
        expect(summaryChart.datasets[0].data).to.deep.equal(Object.values(performance.summary));

        expect(summaryChart.datasets[0].backgroundColor.length).to.equal(3);
        expect(summaryChart.datasets[0].backgroundColor[0]).to.equal(summaryLegend[0].color);
        expect(summaryChart.datasets[0].backgroundColor[1]).to.equal(summaryLegend[1].color);
        expect(summaryChart.datasets[0].backgroundColor[2]).to.equal(summaryLegend[2].color);
    });

    it('has related summary chart data with summary legend data when testing', () => {
        trackerSource = trackerFactory.create('data.performance', {
            memory: {
                peak: 1048576,
            },
            timer: {
                laravel: 350,
                boot: 1,
                setup: 99,
                response: 5,
            },
        });
        let performance = new HttpPerformance(trackerSource.data.performance);
        let wrapper = mountWithTracker(TabPerformanceSummary, new Tracker(trackerSource));

        let summaryLegend = performance.summaryLegendData(wrapper.vm.$t);
        let summaryChart = performance.summaryChartData(wrapper.vm.$t);

        expect(summaryChart.labels.length).to.equal(4);
        expect(summaryChart.labels.length).to.equal(summaryLegend.length);

        expect(summaryChart.labels[0]).to.equal(summaryLegend[0].label);
        expect(summaryChart.labels[1]).to.equal(summaryLegend[1].label);
        expect(summaryChart.labels[2]).to.equal(summaryLegend[2].label);
        expect(summaryChart.labels[3]).to.equal(summaryLegend[3].label);

        expect(summaryChart.datasets[0].data.length).to.equal(4);
        expect(summaryChart.datasets[0].data).to.deep.equal(Object.values(performance.summary));

        expect(summaryChart.datasets[0].backgroundColor.length).to.equal(4);
        expect(summaryChart.datasets[0].backgroundColor[0]).to.equal(summaryLegend[0].color);
        expect(summaryChart.datasets[0].backgroundColor[1]).to.equal(summaryLegend[1].color);
        expect(summaryChart.datasets[0].backgroundColor[2]).to.equal(summaryLegend[2].color);
        expect(summaryChart.datasets[0].backgroundColor[3]).to.equal(summaryLegend[3].color);
    });
});

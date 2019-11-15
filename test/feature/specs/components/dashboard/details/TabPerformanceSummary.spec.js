import Tracker from '@/models/tracker';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabPerformanceSummary from '@/components/dashboard/details/TabPerformanceSummary';

describe('TabPerformanceSummary Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabPerformanceSummary, tracker);
    });

    it('has peak of memory usage', () => {
        tracker = new Tracker(trackerFactory.create('meta', { env: 'local' }));
        wrapper = mountWithTracker(TabPerformanceSummary, tracker);
        expect(wrapper.find('.top').text()).to.contain(tracker.performance.memoryPeakForHuman);

        tracker = new Tracker(trackerFactory.create('meta', { env: 'testing' }));
        wrapper = mountWithTracker(TabPerformanceSummary, tracker);
        expect(wrapper.find('.top').text()).to.not.contain(tracker.performance.memoryPeakForHuman);
    });

    it('has total laravel execution time', () => {
        expect(wrapper.find('.top').text()).to.contain(tracker.performance.laravelTimeForHuman);
    });

    it('has http timer chart legend', () => {
        expect(wrapper.find('.summary').text()).to.contain(tracker.performance.summary.boot);
        expect(wrapper.find('.summary').text()).to.contain(wrapper.vm.$t('tabs.performance.summary.boot'));
        expect(wrapper.find('.summary').text()).to.contain(tracker.performance.summary.route);
        expect(wrapper.find('.summary').text()).to.contain(wrapper.vm.$t('tabs.performance.summary.route'));
        expect(wrapper.find('.summary').text()).to.contain(tracker.performance.summary.middleware);
        expect(wrapper.find('.summary').text()).to.contain(wrapper.vm.$t('tabs.performance.summary.middleware'));
        expect(wrapper.find('.summary').text()).to.contain(tracker.performance.summary.request);
        expect(wrapper.find('.summary').text()).to.contain(wrapper.vm.$t('tabs.performance.summary.request'));
        expect(wrapper.find('.summary').text()).to.contain(tracker.performance.summary.response);
        expect(wrapper.find('.summary').text()).to.contain(wrapper.vm.$t('tabs.performance.summary.response'));
        expect(wrapper.find('.summary').text()).to.contain(tracker.performance.summary.other);
        expect(wrapper.find('.summary').text()).to.contain(wrapper.vm.$t('tabs.performance.summary.other'));
    });

    it('has http timer chart legend with tests setup timer if delivered', () => {
        let trackerSource = trackerFactory.create('data.performance', {
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
        tracker = new Tracker(trackerSource);
        wrapper = mountWithTracker(TabPerformanceSummary, tracker);

        expect(wrapper.find('.summary').text()).to.contain(tracker.performance.summary.setup);
        expect(wrapper.find('.summary').text()).to.contain(wrapper.vm.$t('tabs.performance.summary.setup'));
    });

    it('has performance summary chart', () => {
        tracker = new Tracker(trackerFactory.create());
        let performanceSpy = sinon.spy(tracker.performance, 'summaryChartData');

        wrapper = mountWithTracker(TabPerformanceSummary, tracker);
        let wrapperPerformanceSummaryChart = wrapper.find({ name: 'chart-performance-summary' });

        expect(wrapperPerformanceSummaryChart.isVisible()).to.be.true;
        expect(wrapperPerformanceSummaryChart.find('canvas.chartjs-render-monitor').isVisible()).to.be.true;
        expect(wrapperPerformanceSummaryChart.props().tracker).to.equal(wrapper.props().tracker);

        expect(performanceSpy.calledOnce).to.be.true;
    });

    it('has queries timer chart legend', () => {
        expect(wrapper.find('.queries').text()).to.contain(tracker.performance.queries.queries);
        expect(wrapper.find('.queries').text()).to.contain(tracker.performance.queries.other);
    });

    it('has queries timer chart legend if at least queries are provided', () => {
        tracker = new Tracker(trackerFactory.create('data', { redis: [] }));
        wrapper = mountWithTracker(TabPerformanceSummary, tracker);

        expect(wrapper.text()).to.contain('queries');
        expect(wrapper.text()).to.not.contain('redis');
    });

    it('has queries timer chart legend if at least redis is provided', () => {
        tracker = new Tracker(trackerFactory.create('data', { queries: [] }));
        wrapper = mountWithTracker(TabPerformanceSummary, tracker);

        expect(wrapper.text()).to.not.contain('queries');
        expect(wrapper.text()).to.contain('redis');
    });

    it('has not queries timer chart legend if queries and redis are not provided', () => {
        tracker = new Tracker(trackerFactory.create('data', { queries: [], redis: [] }));
        wrapper = mountWithTracker(TabPerformanceSummary, tracker);

        expect(wrapper.text()).to.not.contain('queries');
        expect(wrapper.text()).to.not.contain('redis');
    });

    it('has performance queries chart', () => {
        tracker = new Tracker(trackerFactory.create());
        let performanceSpy = sinon.spy(tracker.performance, 'queriesChartData');

        wrapper = mountWithTracker(TabPerformanceSummary, tracker);
        let wrapperPerformanceQueriesChart = wrapper.find({ name: 'chart-performance-queries' });

        expect(wrapperPerformanceQueriesChart.isVisible()).to.be.true;
        expect(wrapperPerformanceQueriesChart.find('canvas.chartjs-render-monitor').isVisible()).to.be.true;
        expect(wrapperPerformanceQueriesChart.props().tracker).to.equal(wrapper.props().tracker);

        expect(performanceSpy.calledOnce).to.be.true;
    });

    it('has performance queries chart if at least queries are provided', () => {
        tracker = new Tracker(trackerFactory.create('data', { redis: [] }));
        let performanceSpy = sinon.spy(tracker.performance, 'queriesChartData');

        wrapper = mountWithTracker(TabPerformanceSummary, tracker);
        let wrapperPerformanceQueriesChart = wrapper.find({ name: 'chart-performance-queries' });

        expect(wrapperPerformanceQueriesChart.isVisible()).to.be.true;
        expect(wrapperPerformanceQueriesChart.find('canvas.chartjs-render-monitor').isVisible()).to.be.true;
        expect(wrapperPerformanceQueriesChart.props().tracker).to.equal(wrapper.props().tracker);

        expect(performanceSpy.calledOnce).to.be.true;
    });

    it('has performance queries chart if at least redis is provided', () => {
        tracker = new Tracker(trackerFactory.create('data', { queries: [] }));
        let performanceSpy = sinon.spy(tracker.performance, 'queriesChartData');

        wrapper = mountWithTracker(TabPerformanceSummary, tracker);
        let wrapperPerformanceQueriesChart = wrapper.find({ name: 'chart-performance-queries' });

        expect(wrapperPerformanceQueriesChart.isVisible()).to.be.true;
        expect(wrapperPerformanceQueriesChart.find('canvas.chartjs-render-monitor').isVisible()).to.be.true;
        expect(wrapperPerformanceQueriesChart.props().tracker).to.equal(wrapper.props().tracker);

        expect(performanceSpy.calledOnce).to.be.true;
    });

    it('has not performance queries chart if queries are not provided', () => {
        tracker = new Tracker(trackerFactory.create('data', { queries: [], redis: [] }));
        wrapper = mountWithTracker(TabPerformanceSummary, tracker);
        let wrapperPerformanceQueriesChart = wrapper.find({ name: 'chart-performance-queries' });

        expect(wrapperPerformanceQueriesChart.exists()).to.be.false;
    });
});

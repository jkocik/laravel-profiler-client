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
        expect(wrapper.find('.summary').text()).to.contain(tracker.performance.summary.middleware);
        expect(wrapper.find('.summary').text()).to.contain(wrapper.vm.$t('tabs.performance.summary.middleware'));
        expect(wrapper.find('.summary').text()).to.contain(tracker.performance.summary.request);
        expect(wrapper.find('.summary').text()).to.contain(wrapper.vm.$t('tabs.performance.summary.request'));
        expect(wrapper.find('.summary').text()).to.contain(tracker.performance.summary.response);
        expect(wrapper.find('.summary').text()).to.contain(wrapper.vm.$t('tabs.performance.summary.response'));
        expect(wrapper.find('.summary').text()).to.contain(tracker.performance.summary.other);
        expect(wrapper.find('.summary').text()).to.contain(wrapper.vm.$t('tabs.performance.summary.other'));
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

    it('has not queries timer chart legend if queries are not provided', () => {
        tracker = new Tracker(trackerFactory.create('data', { queries: [] }));
        wrapper = mountWithTracker(TabPerformanceSummary, tracker);

        expect(wrapper.text()).to.not.contain('queries');
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

    it('has not performance queries chart if queries are not provided', () => {
        tracker = new Tracker(trackerFactory.create('data', { queries: [] }));
        wrapper = mountWithTracker(TabPerformanceSummary, tracker);
        let wrapperPerformanceQueriesChart = wrapper.find({ name: 'chart-performance-queries' });

        expect(wrapperPerformanceQueriesChart.exists()).to.be.false;
    });
});

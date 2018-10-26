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
        expect(wrapper.trs(0).text()).to.contain(tracker.performance.memoryPeakForHuman);
        expect(wrapper.trs(0).find('td:nth-child(2)').classes()).to.not.contain('has-text-grey-lighter');

        tracker = new Tracker(trackerFactory.create('meta', { env: 'testing' }));
        wrapper = mountWithTracker(TabPerformanceSummary, tracker);
        expect(wrapper.trs(0).text()).to.contain(tracker.performance.memoryPeakForHuman);
        expect(wrapper.trs(0).find('td:nth-child(2)').classes()).to.contain('has-text-grey-lighter');
    });

    it('has total laravel execution time', () => {
        expect(wrapper.trs(1).text()).to.contain(tracker.performance.laravelTimeForHuman);
    });

    it('has http timer table', () => {
        expect(wrapper.trs(2).text()).to.contain(tracker.performance.summary.boot);
        expect(wrapper.trs(2).text()).to.contain(wrapper.vm.$t('tabs.performance.boot'));
        expect(wrapper.trs(3).text()).to.contain(tracker.performance.summary.middleware);
        expect(wrapper.trs(3).text()).to.contain(wrapper.vm.$t('tabs.performance.middleware'));
        expect(wrapper.trs(4).text()).to.contain(tracker.performance.summary.request);
        expect(wrapper.trs(4).text()).to.contain(wrapper.vm.$t('tabs.performance.request'));
        expect(wrapper.trs(5).text()).to.contain(tracker.performance.summary.response);
        expect(wrapper.trs(5).text()).to.contain(wrapper.vm.$t('tabs.performance.response'));
    });
});

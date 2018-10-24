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

    it('has total laravel execution time', () => {
        expect(wrapper.trs(0).text()).to.contain(tracker.performance.summaryLaravelForHuman);
    });

    it('has peak of memory usage', () => {
        tracker = new Tracker(trackerFactory.create('meta', { env: 'local' }));
        wrapper = mountWithTracker(TabPerformanceSummary, tracker);
        expect(wrapper.trs(1).text()).to.contain(tracker.performance.memoryPeakForHuman);
        expect(wrapper.trs(1).find('td:nth-child(2)').classes()).to.not.contain('has-text-grey-lighter');

        tracker = new Tracker(trackerFactory.create('meta', { env: 'testing' }));
        wrapper = mountWithTracker(TabPerformanceSummary, tracker);
        expect(wrapper.trs(1).text()).to.contain(tracker.performance.memoryPeakForHuman);
        expect(wrapper.trs(1).find('td:nth-child(2)').classes()).to.contain('has-text-grey-lighter');
    });
});

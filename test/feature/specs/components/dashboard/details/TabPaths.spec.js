import Tracker from '@/models/tracker';
import TabPaths from '@/components/dashboard/details/TabPaths';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabPaths Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabPaths, tracker);
    });

    it('has paths', () => {
        expect(wrapper.findAll('tr').length).to.equal(tracker.countPaths());
        expect(wrapper.trs(0).text()).to.contain(tracker.paths[0].name.replace(/_/g, ' '));
        expect(wrapper.trs(0).text()).to.contain(tracker.paths[0].path);
    });
});

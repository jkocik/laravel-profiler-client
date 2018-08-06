import Tracker from '@/models/tracker';
import TabEvents from '@/components/dashboard/details/TabEvents';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabEvents Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabEvents, tracker);
    });

    it('has tree views with events', () => {
        let wrapperTreeViews = wrapper.findAll({ name: 'tree-view' });
        let wrapperTreeViewA = wrapperTreeViews.at(0);

        expect(wrapperTreeViewA.props().data).to.deep.equal(tracker.events[0].data);
        expect(wrapperTreeViewA.props().label).to.equal(tracker.events[0].name);
    });
});

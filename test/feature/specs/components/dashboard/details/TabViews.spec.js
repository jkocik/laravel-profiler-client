import Tracker from '@/models/tracker';
import TabViews from '@/components/dashboard/details/TabViews';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabViews Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabViews, tracker);
    });

    it('has tree views with views', () => {
        let wrapperTreeViews = wrapper.findAll({ name: 'tree-view' });
        let wrapperTreeViewA = wrapperTreeViews.at(0);
        let wrapperTreeViewB = wrapperTreeViews.at(1);

        expect(wrapperTreeViewA.props().data).to.deep.equal(tracker.views[0].data);
        expect(wrapperTreeViewA.props().label).to.equal(tracker.views[0].label);

        expect(wrapperTreeViewB.props().data).to.deep.equal(tracker.views[1].data);
        expect(wrapperTreeViewB.props().label).to.equal(tracker.views[1].label);
    });
});

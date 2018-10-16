import Tracker from '@/models/tracker';
import TabAuth from '@/components/dashboard/details/TabAuth';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabAuth Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabAuth, tracker);
    });

    it('has tree view with auth', () => {
        let wrapperTreeView = wrapper.find({ name: 'tree-view' });

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.auth);
        expect(wrapperTreeView.props().label).to.equal('user');
    });
});

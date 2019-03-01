import Tracker from '@/models/tracker';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabHttpSession from '@/components/dashboard/details/TabHttpSession';

describe('TabHttpSession Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabHttpSession, tracker);
    });

    it('has tree view with session data', () => {
        let wrapperTreeView = wrapper.find({ name: 'tree-view' });

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.session);
        expect(wrapperTreeView.props().label).to.equal('session');
        expect(wrapperTreeView.props().openFirstLevel).to.be.true;
    });
});

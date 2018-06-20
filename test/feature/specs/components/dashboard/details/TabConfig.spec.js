import Tracker from '@/models/tracker';
import TabConfig from '@/components/dashboard/details/TabConfig';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabConfig Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabConfig, tracker);
    });

    it('has tree view with config', () => {
        let wrapperTreeView = wrapper.find({ name: 'tree-view' });

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.config);
        expect(wrapperTreeView.props().label).to.equal('config');
    });
});

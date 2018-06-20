import Tracker from '@/models/tracker';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabHttpResponseSummary from '@/components/dashboard/details/TabHttpResponseSummary';

describe('TabHttpResponseSummary Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabHttpResponseSummary, tracker);
    });

    it('has status', () => {
        expect(wrapper.trs(0).text()).to.contain(tracker.status);
    });

    it('has status text', () => {
        expect(wrapper.trs(1).text()).to.contain(tracker.statusText);
    });

    it('has tree view with headers', () => {
        let wrapperTreeView = wrapper.find({ name: 'tree-view' });

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.response.headers);
        expect(wrapperTreeView.props().label).to.equal('headers');
    });
});

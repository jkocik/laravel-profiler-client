import Tracker from '@/models/tracker';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabHttpResponseJson from '@/components/dashboard/details/TabHttpResponseJson';

describe('TabHttpResponseJson Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create('data', { content: '{ "one": { "two": true } }' }));
        wrapper = mountWithTracker(TabHttpResponseJson, tracker);
    });

    it('has tree view with content', () => {
        let wrapperTreeView = wrapper.find({ name: 'tree-view' });

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.response.json);
        expect(wrapperTreeView.props().label).to.equal('content');
    });
});

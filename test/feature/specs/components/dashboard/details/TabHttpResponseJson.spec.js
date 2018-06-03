import Tracker from '@/models/tracker';
import { treeViewService } from '@/services/tree-view.service';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabHttpResponseJson from '@/components/dashboard/details/TabHttpResponseJson';

describe('TabHttpResponseJson Component', () => {
    let tracker;
    let wrapper;
    let treeViewSpy;

    beforeEach(() => {
        treeViewSpy = sinon.spy(treeViewService, 'maxDepthOf');

        tracker = new Tracker(trackerFactory.create('data.response', { content: '{ "one": { "two": true } }' }));
        wrapper = mountWithTracker(TabHttpResponseJson, tracker);
    });

    afterEach(() => {
        treeViewService.maxDepthOf.restore();
    });

    it('has tree view with content', () => {
        let wrapperTreeView = wrapper.find({ name: 'tree-view' });

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.response.json);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'content',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(tracker.response.json).calledOnce).to.be.true;
    });
});

import Tracker from '@/models/tracker';
import { treeViewService } from '@/services/tree-view.service';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabHttpSession from '@/components/dashboard/details/TabHttpSession';

describe('TabHttpSession Component', () => {
    let tracker;
    let wrapper;
    let treeViewSpy;

    beforeEach(() => {
        treeViewSpy = sinon.spy(treeViewService, 'maxDepthOf');

        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabHttpSession, tracker);
    });

    afterEach(() => {
        treeViewService.maxDepthOf.restore();
    });

    it('has tree view with session data', () => {
        let wrapperTreeView = wrapper.find({ name: 'tree-view' });

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.session);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'session',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(tracker.session).calledOnce).to.be.true;
    });
});

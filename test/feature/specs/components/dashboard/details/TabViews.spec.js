import Tracker from '@/models/tracker';
import { treeViewService } from '@/services/tree-view.service';
import TabViews from '@/components/dashboard/details/TabViews';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabViews Component', () => {
    let tracker;
    let wrapper;
    let treeViewSpy;

    beforeEach(() => {
        treeViewSpy = sinon.spy(treeViewService, 'maxDepthOf');

        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabViews, tracker);
    });

    afterEach(() => {
        treeViewService.maxDepthOf.restore();
    });

    it('has tree views with views', () => {
        let wrapperTreeViews = wrapper.findAll({ name: 'tree-view' });
        let wrapperTreeViewA = wrapperTreeViews.at(0);
        let wrapperTreeViewB = wrapperTreeViews.at(1);

        expect(wrapperTreeViewA.props().data).to.deep.equal(tracker.views[0].data);
        expect(wrapperTreeViewA.props().options).to.deep.equal({
            rootObjectKey: tracker.views[0].label,
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(tracker.views[0].data).calledOnce).to.be.true;

        expect(wrapperTreeViewB.props().data).to.deep.equal(tracker.views[1].data);
        expect(wrapperTreeViewB.props().options).to.deep.equal({
            rootObjectKey: tracker.views[1].label,
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(tracker.views[1].data).calledOnce).to.be.true;
    });
});

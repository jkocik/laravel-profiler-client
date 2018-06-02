import Tracker from '@/models/tracker';
import { treeViewService } from '@/services/tree-view.service';
import TabConfig from '@/components/dashboard/details/TabConfig';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabConfig Component', () => {
    let tracker;
    let wrapper;
    let treeViewSpy;

    beforeEach(() => {
        treeViewSpy = sinon.spy(treeViewService, 'maxDepthOf');

        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabConfig, tracker);
    });

    afterEach(() => {
        treeViewService.maxDepthOf.restore();
    });

    it('has tree view with config', () => {
        let wrapperTreeView = wrapper.find({ name: 'tree-view' });

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.config);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'config',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(tracker.config).calledOnce).to.be.true;
    });
});

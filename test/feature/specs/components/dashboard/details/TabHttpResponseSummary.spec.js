import Tracker from '@/models/tracker';
import { treeViewService } from '@/services/tree-view.service';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabHttpResponseSummary from '@/components/dashboard/details/TabHttpResponseSummary';

describe('TabHttpResponseSummary Component', () => {
    let tracker;
    let wrapper;
    let treeViewSpy;

    beforeEach(() => {
        treeViewSpy = sinon.spy(treeViewService, 'maxDepthOf');

        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabHttpResponseSummary, tracker);
    });

    afterEach(() => {
        treeViewService.maxDepthOf.restore();
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
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'headers',
            maxDepth: 2,
        });
        expect(treeViewSpy.withArgs(tracker.response.headers, 2).calledOnce).to.be.true;
    });
});

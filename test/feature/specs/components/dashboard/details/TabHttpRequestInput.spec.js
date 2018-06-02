import Tracker from '@/models/tracker';
import { treeViewService } from '@/services/tree-view.service';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabHttpRequestInput from '@/components/dashboard/details/TabHttpRequestInput';

describe('TabHttpRequestInput Component', () => {
    let tracker;
    let wrapper;
    let treeViewSpy;

    beforeEach(() => {
        treeViewSpy = sinon.spy(treeViewService, 'maxDepthOf');

        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabHttpRequestInput, tracker);
    });

    afterEach(() => {
        treeViewService.maxDepthOf.restore();
    });

    it('has tree view with input', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(0);

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.request.input);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'input',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(tracker.request.input).calledOnce).to.be.true;
    });

    it('has tree view with files', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(1);

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.request.files);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'files',
            maxDepth: 3,
        });
        expect(treeViewSpy.withArgs(tracker.request.files).calledOnce).to.be.true;
    });
});

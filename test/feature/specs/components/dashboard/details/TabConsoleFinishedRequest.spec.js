import Tracker from '@/models/tracker';
import { treeViewService } from '@/services/tree-view.service';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabConsoleFinishedRequest from '@/components/dashboard/details/TabConsoleFinishedRequest';

describe('TabConsoleFinishedRequest Component', () => {
    let tracker;
    let wrapper;
    let treeViewSpy;

    beforeEach(() => {
        treeViewSpy = sinon.spy(treeViewService, 'maxDepthOf');

        tracker = new Tracker(trackerFactory.create('meta', { type: 'command-finished', path: 'inspire' }));
        wrapper = mountWithTracker(TabConsoleFinishedRequest, tracker);
    });

    afterEach(() => {
        treeViewService.maxDepthOf.restore();
    });

    it('has command', () => {
        expect(wrapper.findAll('li').at(0).text()).to.contain('command');
        expect(wrapper.findAll('li').at(0).text()).to.contain('inspire');
    });

    it('has tree view with arguments', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(0);

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.request.arguments);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'arguments',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(tracker.request.arguments).calledOnce).to.be.true;
    });

    it('has tree view with options', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(1);

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.request.options);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'options',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(tracker.request.options).calledOnce).to.be.true;
    });
});

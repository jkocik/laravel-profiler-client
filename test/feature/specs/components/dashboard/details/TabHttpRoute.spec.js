import Tracker from '@/models/tracker';
import { treeViewService } from '@/services/tree-view.service';
import TabHttpRoute from '@/components/dashboard/details/TabHttpRoute';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabHttpRoute Component', () => {
    let tracker;
    let wrapper;
    let treeViewSpy;

    beforeEach(() => {
        treeViewSpy = sinon.spy(treeViewService, 'maxDepthOf');

        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabHttpRoute, tracker);
    });

    afterEach(() => {
        treeViewService.maxDepthOf.restore();
    });

    it('has controller when uses controller to process route', () => {
        expect(wrapper.trs(0).text()).to.contain('controller');
        expect(wrapper.trs(0).text()).to.not.contain('closure');
        expect(wrapper.trs(0).text()).to.contain(tracker.route.uses);
    });

    it('has closure when uses closure to process route', () => {
        tracker = new Tracker(trackerFactory.create('data.route', { uses: { closure: 'abc:10-20' } }));
        wrapper = mountWithTracker(TabHttpRoute, tracker);

        expect(wrapper.trs(0).text()).to.contain('closure');
        expect(wrapper.trs(0).text()).to.not.contain('controller');
        expect(wrapper.trs(0).text()).to.contain('abc:10-20');
    });

    it('has methods', () => {
        expect(wrapper.trs(1).text()).to.contain(tracker.route.methods);
    });

    it('has uri', () => {
        expect(wrapper.trs(2).text()).to.contain(tracker.route.uri);
    });

    it('has regex', () => {
        expect(wrapper.trs(3).text()).to.contain(tracker.route.regex);
    });

    it('has name', () => {
        expect(wrapper.trs(4).text()).to.contain(tracker.route.name);
    });

    it('has prefix', () => {
        expect(wrapper.trs(5).text()).to.contain(tracker.route.prefix);
    });

    it('has middleware', () => {
        expect(wrapper.trs(6).text()).to.contain(tracker.route.middleware);
    });

    it('has tree view with parameters', () => {
        let wrapperTreeView = wrapper.find({ name: 'tree-view' });

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.route.parameters);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'parameters',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(tracker.route.parameters).calledOnce).to.be.true;
    });
});

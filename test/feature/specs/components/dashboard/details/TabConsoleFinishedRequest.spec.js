import Buefy from 'buefy';
import TreeView from 'vue-json-tree-view';
import { createLocalVue, mount } from '@vue/test-utils';
import Tracker from '@/models/tracker';
import { dummyTrackerData } from './../../../../../fixtures/es6';
import { treeViewService } from './../../../../../../src/services/tree-view.service';
import TabConsoleFinishedRequest from '@/components/dashboard/details/TabConsoleFinishedRequest';

describe('TabConsoleFinishedRequest Component', () => {
    let wrapper;
    let treeViewSpy;
    let dummyTracker;

    beforeEach(() => {
        treeViewSpy = sinon.spy(treeViewService, 'maxDepthOf');

        let meta = { meta: { type: 'command-finished', 'path': 'inspire' } };
        dummyTracker = new Tracker(Object.assign({}, dummyTrackerData, meta));

        let localVue = createLocalVue();
        localVue.use(Buefy);
        localVue.use(TreeView);

        wrapper = mount(TabConsoleFinishedRequest, {
            localVue,
            propsData: {
                tracker: dummyTracker,
            },
        });
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

        expect(wrapperTreeView.props().data).to.deep.equal(dummyTrackerData.data.request.arguments);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'arguments',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(dummyTracker.request.arguments).calledOnce).to.be.true;
    });

    it('has tree view with options', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(1);

        expect(wrapperTreeView.props().data).to.deep.equal(dummyTrackerData.data.request.options);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'options',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(dummyTracker.request.options).calledOnce).to.be.true;
    });
});

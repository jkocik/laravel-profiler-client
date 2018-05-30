import Buefy from 'buefy';
import TreeView from 'vue-json-tree-view';
import { createLocalVue, mount } from '@vue/test-utils';
import Tracker from '@/models/tracker';
import { dummyTrackerData } from './../../../../../fixtures/es6';
import TabHttpSession from '@/components/dashboard/details/TabHttpSession';
import { treeViewService } from './../../../../../../src/services/tree-view.service';

describe('TabConfig Component', () => {
    let wrapper;
    let treeViewSpy;
    let dummyTracker;

    beforeEach(() => {
        treeViewSpy = sinon.spy(treeViewService, 'maxDepthOf');
        dummyTracker = new Tracker(dummyTrackerData);

        let localVue = createLocalVue();
        localVue.use(Buefy);
        localVue.use(TreeView);

        wrapper = mount(TabHttpSession, {
            localVue,
            propsData: {
                tracker: dummyTracker,
            },
        });
    });

    afterEach(() => {
        treeViewService.maxDepthOf.restore();
    });

    it('has tree view with session data', () => {
        let wrapperTreeView = wrapper.find({ name: 'tree-view' });

        expect(wrapperTreeView.props().data).to.deep.equal(dummyTracker.session);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'session',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(dummyTracker.session).calledOnce).to.be.true;
    });
});

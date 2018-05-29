import Buefy from 'buefy';
import TreeView from 'vue-json-tree-view';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import { dummyTrackerData } from './../../../../../fixtures/es6';
import { treeViewService } from './../../../../../../src/services/tree-view.service';
import TabHttpRequestInput from '@/components/dashboard/details/TabHttpRequestInput';

describe('TabHttpRequestInput Component', () => {
    let wrapper;
    let localVue;
    let treeViewSpy;
    let dummyTracker;

    let mountWithTracker = (tracker) => {
        return mount(TabHttpRequestInput, {
            localVue,
            i18n,
            propsData: {
                tracker,
            },
        });
    };

    beforeEach(() => {
        treeViewSpy = sinon.spy(treeViewService, 'maxDepthOf');

        localVue = createLocalVue();
        localVue.use(Buefy);
        localVue.use(TreeView);

        dummyTracker = new Tracker(dummyTrackerData);

        wrapper = mountWithTracker(dummyTracker);
    });

    afterEach(() => {
        treeViewService.maxDepthOf.restore();
    });

    it('has tree view with input', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(0);

        expect(wrapperTreeView.props().data).to.deep.equal(dummyTrackerData.data.request.input);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'input',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(dummyTracker.request.input).calledOnce).to.be.true;
    });

    it('has tree view with files', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(1);

        expect(wrapperTreeView.props().data).to.deep.equal(dummyTrackerData.data.request.files);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'files',
            maxDepth: 3,
        });
        expect(treeViewSpy.withArgs(dummyTracker.request.files).calledOnce).to.be.true;
    });
});

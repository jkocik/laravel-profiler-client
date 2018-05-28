import Buefy from 'buefy';
import TreeView from 'vue-json-tree-view';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import TabConfig from '@/components/dashboard/details/TabConfig';
import { dummyTrackerData } from './../../../../../fixtures/es6';

describe('TabConfig Component', () => {
    let wrapper;
    let dummyTracker;

    beforeEach(() => {
        dummyTracker = new Tracker(dummyTrackerData);

        let localVue = createLocalVue();
        localVue.use(Buefy);
        localVue.use(TreeView);

        wrapper = mount(TabConfig, {
            localVue,
            i18n,
            propsData: {
                tracker: dummyTracker,
            },
        });
    });

    it('has tree view with config', () => {
        let wrapperTreeView = wrapper.find({ name: 'tree-view' });

        expect(wrapperTreeView.props().data).to.deep.equal(dummyTracker.config);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'config',
            maxDepth: 1,
        });
    });
});

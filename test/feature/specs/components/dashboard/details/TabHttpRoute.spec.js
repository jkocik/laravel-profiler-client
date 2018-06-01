import Buefy from 'buefy';
import TreeView from 'vue-json-tree-view';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import { dummyTrackerData } from './../../../../../fixtures/es6';
import { treeViewService } from './../../../../../../src/services/tree-view.service';
import TabHttpRoute from '@/components/dashboard/details/TabHttpRoute';

describe('TabHttpRoute Component', () => {
    let wrapper;
    let localVue;
    let treeViewSpy;
    let dummyTracker;

    let mountWithTracker = (tracker) => {
        return mount(TabHttpRoute, {
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

    it('has controller when uses controller to process route', () => {
        expect(wrapper.findAll('tr').at(0).text()).to.contain('controller');
        expect(wrapper.findAll('tr').at(0).text()).to.not.contain('closure');
        expect(wrapper.findAll('tr').at(0).text()).to.contain(dummyTracker.route.uses);
    });

    it('has closure when uses closure to process route', () => {
        let route = Object.assign({}, dummyTrackerData.data.route, { uses: { closure: 'abc:10-20' } });
        let data = Object.assign({}, dummyTrackerData.data, { route });
        wrapper = mountWithTracker(new Tracker(Object.assign({}, dummyTrackerData, { data })));

        expect(wrapper.findAll('tr').at(0).text()).to.contain('closure');
        expect(wrapper.findAll('tr').at(0).text()).to.not.contain('controller');
        expect(wrapper.findAll('tr').at(0).text()).to.contain('abc:10-20');
    });

    it('has methods', () => {
        expect(wrapper.findAll('tr').at(1).text()).to.contain(dummyTracker.route.methods);
    });

    it('has uri', () => {
        expect(wrapper.findAll('tr').at(2).text()).to.contain(dummyTracker.route.uri);
    });

    it('has regex', () => {
        expect(wrapper.findAll('tr').at(3).text()).to.contain(dummyTracker.route.regex);
    });

    it('has name', () => {
        expect(wrapper.findAll('tr').at(4).text()).to.contain(dummyTracker.route.name);
    });

    it('has prefix', () => {
        expect(wrapper.findAll('tr').at(5).text()).to.contain(dummyTracker.route.prefix);
    });

    it('has middleware', () => {
        expect(wrapper.findAll('tr').at(6).text()).to.contain(dummyTracker.route.middleware);
    });

    it('has tree view with parameters', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(0);

        expect(wrapperTreeView.props().data).to.deep.equal(dummyTrackerData.data.route.parameters);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'parameters',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(dummyTracker.route.parameters).calledOnce).to.be.true;
    });
});

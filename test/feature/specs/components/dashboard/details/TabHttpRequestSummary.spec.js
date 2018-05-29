import Buefy from 'buefy';
import TreeView from 'vue-json-tree-view';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import { dummyTrackerData } from './../../../../../fixtures/es6';
import { treeViewService } from './../../../../../../src/services/tree-view.service';
import TabHttpRequestSummary from '@/components/dashboard/details/TabHttpRequestSummary';

describe('TabHttpRequestSummary Component', () => {
    let wrapper;
    let localVue;
    let treeViewSpy;
    let dummyTracker;

    let mountWithTracker = (tracker) => {
        return mount(TabHttpRequestSummary, {
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

    it('has method', () => {
        expect(wrapper.findAll('tr').at(0).text()).to.contain(dummyTracker.method);
    });

    it('has path', () => {
        expect(wrapper.findAll('tr').at(1).text()).to.contain(dummyTracker.path);
    });

    it('has url', () => {
        expect(wrapper.findAll('tr').at(2).text()).to.contain(dummyTracker.request.url);
    });

    it('has ip', () => {
        expect(wrapper.findAll('tr').at(3).text()).to.contain(dummyTracker.request.ip);
    });

    it('has ajax', () => {
        expect(wrapper.findAll('tr').at(4).find('.fa-toggle-on').exists()).to.be.false;
        expect(wrapper.findAll('tr').at(4).find('.fa-toggle-off').exists()).to.be.true;

        let meta = Object.assign({}, dummyTrackerData.meta, { ajax: true });
        wrapper = mountWithTracker(new Tracker(Object.assign({}, dummyTrackerData, { meta })));

        expect(wrapper.findAll('tr').at(4).find('.fa-toggle-on').exists()).to.be.true;
        expect(wrapper.findAll('tr').at(4).find('.fa-toggle-off').exists()).to.be.false;
    });

    it('has json', () => {
        expect(wrapper.findAll('tr').at(5).find('.fa-toggle-on').exists()).to.be.false;
        expect(wrapper.findAll('tr').at(5).find('.fa-toggle-off').exists()).to.be.true;

        let meta = Object.assign({}, dummyTrackerData.meta, { json: true });
        wrapper = mountWithTracker(new Tracker(Object.assign({}, dummyTrackerData, { meta })));

        expect(wrapper.findAll('tr').at(5).find('.fa-toggle-on').exists()).to.be.true;
        expect(wrapper.findAll('tr').at(5).find('.fa-toggle-off').exists()).to.be.false;
    });

    it('has pjax', () => {
        expect(wrapper.findAll('tr').at(6).find('.fa-toggle-on').exists()).to.be.false;
        expect(wrapper.findAll('tr').at(6).find('.fa-toggle-off').exists()).to.be.true;

        let request = Object.assign({}, dummyTrackerData.data.request, { pjax: true });
        let data = Object.assign({}, dummyTrackerData.data, { request });
        wrapper = mountWithTracker(new Tracker(Object.assign({}, dummyTrackerData, { data })));

        expect(wrapper.findAll('tr').at(6).find('.fa-toggle-on').exists()).to.be.true;
        expect(wrapper.findAll('tr').at(6).find('.fa-toggle-off').exists()).to.be.false;
    });

    it('has tree view with query', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(0);

        expect(wrapperTreeView.props().data).to.deep.equal(dummyTrackerData.data.request.query);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'query',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(dummyTracker.request.query).calledOnce).to.be.true;
    });

    it('has tree view with header', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(1);

        expect(wrapperTreeView.props().data).to.deep.equal(dummyTrackerData.data.request.header);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'header',
            maxDepth: 2,
        });
        expect(treeViewSpy.withArgs(dummyTracker.request.header, 2).calledOnce).to.be.true;
    });

    it('has tree view with cookie', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(2);

        expect(wrapperTreeView.props().data).to.deep.equal(dummyTrackerData.data.request.cookie);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'cookie',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(dummyTracker.request.cookie).calledOnce).to.be.true;
    });
});

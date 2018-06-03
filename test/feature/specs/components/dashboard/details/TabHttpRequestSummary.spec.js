import Tracker from '@/models/tracker';
import { treeViewService } from '@/services/tree-view.service';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabHttpRequestSummary from '@/components/dashboard/details/TabHttpRequestSummary';

describe('TabHttpRequestSummary Component', () => {
    let tracker;
    let wrapper;
    let treeViewSpy;

    beforeEach(() => {
        treeViewSpy = sinon.spy(treeViewService, 'maxDepthOf');

        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabHttpRequestSummary, tracker);
    });

    afterEach(() => {
        treeViewService.maxDepthOf.restore();
    });

    it('has method', () => {
        expect(wrapper.trs(0).text()).to.contain(tracker.method);
    });

    it('has path', () => {
        expect(wrapper.trs(1).text()).to.contain(tracker.path);
    });

    it('has url', () => {
        expect(wrapper.trs(2).text()).to.contain(tracker.request.url);
    });

    it('has ip', () => {
        expect(wrapper.trs(3).text()).to.contain(tracker.request.ip);
    });

    it('has ajax', () => {
        expect(wrapper.trs(4).find('.fa-toggle-on').exists()).to.be.false;
        expect(wrapper.trs(4).find('.fa-toggle-off').exists()).to.be.true;

        tracker = new Tracker(trackerFactory.create('meta', { ajax: true }));
        wrapper = mountWithTracker(TabHttpRequestSummary, tracker);

        expect(wrapper.trs(4).find('.fa-toggle-on').exists()).to.be.true;
        expect(wrapper.trs(4).find('.fa-toggle-off').exists()).to.be.false;
    });

    it('has json', () => {
        expect(wrapper.trs(5).find('.fa-toggle-on').exists()).to.be.false;
        expect(wrapper.trs(5).find('.fa-toggle-off').exists()).to.be.true;

        tracker = new Tracker(trackerFactory.create('meta', { json: true }));
        wrapper = mountWithTracker(TabHttpRequestSummary, tracker);

        expect(wrapper.trs(5).find('.fa-toggle-on').exists()).to.be.true;
        expect(wrapper.trs(5).find('.fa-toggle-off').exists()).to.be.false;
    });

    it('has pjax', () => {
        expect(wrapper.trs(6).find('.fa-toggle-on').exists()).to.be.false;
        expect(wrapper.trs(6).find('.fa-toggle-off').exists()).to.be.true;

        tracker = new Tracker(trackerFactory.create('data.request', { pjax: true }));
        wrapper = mountWithTracker(TabHttpRequestSummary, tracker);

        expect(wrapper.trs(6).find('.fa-toggle-on').exists()).to.be.true;
        expect(wrapper.trs(6).find('.fa-toggle-off').exists()).to.be.false;
    });

    it('has tree view with query', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(0);

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.request.query);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'query',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(tracker.request.query).calledOnce).to.be.true;
    });

    it('has tree view with cookie', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(1);

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.request.cookie);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'cookie',
            maxDepth: 1,
        });
        expect(treeViewSpy.withArgs(tracker.request.cookie).calledOnce).to.be.true;
    });

    it('has tree view with header', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(2);

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.request.header);
        expect(wrapperTreeView.props().options).to.deep.equal({
            rootObjectKey: 'headers',
            maxDepth: 2,
        });
        expect(treeViewSpy.withArgs(tracker.request.header, 2).calledOnce).to.be.true;
    });
});

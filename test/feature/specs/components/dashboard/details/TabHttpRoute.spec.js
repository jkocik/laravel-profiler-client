import Tracker from '@/models/tracker';
import TabHttpRoute from '@/components/dashboard/details/TabHttpRoute';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabHttpRoute Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabHttpRoute, tracker);
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

    it('has form request when uses controller with form request to process route', () => {
        expect(wrapper.trs(1).text()).to.contain('form request');
        expect(wrapper.trs(1).text()).to.contain(tracker.route.formRequest);
    });

    it('has form request when uses closure with form request to process route', () => {
        tracker = new Tracker(trackerFactory.create('data.route', { uses: { form_request: 'FormRequest' } }));
        wrapper = mountWithTracker(TabHttpRoute, tracker);

        expect(wrapper.trs(1).text()).to.contain('form request');
        expect(wrapper.trs(1).text()).to.contain('FormRequest');
    });

    it('has methods', () => {
        expect(wrapper.trs(2).text()).to.contain(tracker.route.methods);
    });

    it('has regex', () => {
        expect(wrapper.trs(3).text()).to.contain(tracker.route.regex);
    });

    it('has uri', () => {
        expect(wrapper.trs(4).text()).to.contain(tracker.route.uri);
    });

    it('has name', () => {
        expect(wrapper.trs(5).text()).to.contain(tracker.route.name);
    });

    it('has prefix', () => {
        expect(wrapper.trs(6).text()).to.contain(tracker.route.prefix);
    });

    it('has tree view with middleware', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(0);

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.route.middleware);
        expect(wrapperTreeView.props().label).to.equal('middleware');
    });

    it('has tree view with parameters', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(1);

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.route.parameters);
        expect(wrapperTreeView.props().label).to.equal('parameters');
    });
});

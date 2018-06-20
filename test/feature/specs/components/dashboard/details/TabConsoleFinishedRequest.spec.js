import Tracker from '@/models/tracker';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabConsoleFinishedRequest from '@/components/dashboard/details/TabConsoleFinishedRequest';

describe('TabConsoleFinishedRequest Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create('meta', { type: 'command-finished', path: 'inspire' }));
        wrapper = mountWithTracker(TabConsoleFinishedRequest, tracker);
    });

    it('has command', () => {
        expect(wrapper.findAll('li').at(0).text()).to.contain('command');
        expect(wrapper.findAll('li').at(0).text()).to.contain('inspire');
    });

    it('has tree view with arguments', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(0);

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.request.arguments);
        expect(wrapperTreeView.props().label).to.equal('arguments');
    });

    it('has tree view with options', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(1);

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.request.options);
        expect(wrapperTreeView.props().label).to.equal('options');
    });
});

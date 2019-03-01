import Tracker from '@/models/tracker';
import TabException from '@/components/dashboard/details/TabException';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabException Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabException, tracker);
    });

    it('has exception', () => {
        expect(wrapper.trs(0).text()).to.contain(tracker.exception.exception);
    });

    it('has message', () => {
        expect(wrapper.trs(1).text()).to.contain(tracker.exception.message);
    });

    it('has file and line details', () => {
        expect(wrapper.trs(2).text()).to.contain(`${tracker.exception.file}:${tracker.exception.line}`);
    });

    it('has tree view with trace', () => {
        let wrapperTreeView = wrapper.find({ name: 'tree-view' });

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.exception.trace);
        expect(wrapperTreeView.props().label).to.equal('trace');
        expect(wrapperTreeView.props().openFirstLevel).to.be.true;
    });
});

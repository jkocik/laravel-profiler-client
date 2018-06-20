import Tracker from '@/models/tracker';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabHttpRequestInput from '@/components/dashboard/details/TabHttpRequestInput';

describe('TabHttpRequestInput Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabHttpRequestInput, tracker);
    });

    it('has tree view with input', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(0);

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.request.input);
        expect(wrapperTreeView.props().label).to.equal('input');
    });

    it('has tree view with files', () => {
        let wrapperTreeView = wrapper.findAll({ name: 'tree-view' }).at(1);

        expect(wrapperTreeView.props().data).to.deep.equal(tracker.request.files);
        expect(wrapperTreeView.props().label).to.equal('files');
    });
});

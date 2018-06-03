import Tracker from '@/models/tracker';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabHttpResponseContent from '@/components/dashboard/details/TabHttpResponseContent';

describe('TabHttpResponseContent Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabHttpResponseContent, tracker);
    });

    it('has content', () => {
        expect(wrapper.text()).to.contain(tracker.response.content);
    });
});

import Tracker from '@/models/tracker';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabHttpRequestServer from '@/components/dashboard/details/TabHttpRequestServer';

describe('TabHttpRequestServer Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabHttpRequestServer, tracker);
    });

    it('has server data', () => {
        let keys = Object.keys(tracker.request.server);

        expect(wrapper.findAll('tr').length).to.equal(keys.length);
        expect(wrapper.trs(0).text()).to.contain(keys[0]);
        expect(wrapper.trs(0).text()).to.contain(tracker.request.server[keys[0]]);
    });
});

import Tracker from '@/models/tracker';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabServiceProviders from '@/components/dashboard/details/TabServiceProviders';

describe('TabServiceProviders Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabServiceProviders, tracker);
    });

    it('has service providers', () => {
        expect(wrapper.findAll('li').length).to.equal(tracker.countServiceProviders());
        expect(wrapper.lis(0).text()).to.contain(tracker.serviceProviders[0]);
    });
});

import Tracker from '@/models/tracker';
import TabBindings from '@/components/dashboard/details/TabBindings';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabBindings Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabBindings, tracker);
    });

    it('has bindings', () => {
        expect(wrapper.findAll('li').length).to.equal(tracker.countBindings());

        expect(wrapper.lis(0).text()).to.contain(tracker.bindings[0].abstract);
        expect(wrapper.lis(0).text()).to.contain(wrapper.vm.$t('tabs.bindings.resolved-as'));
        expect(wrapper.lis(0).text()).to.not.contain(wrapper.vm.$t('tabs.bindings.not-resolved'));
        expect(wrapper.lis(0).text()).to.contain(tracker.bindings[0].resolved);

        expect(wrapper.lis(1).text()).to.contain(tracker.bindings[1].abstract);
        expect(wrapper.lis(1).text()).to.not.contain(wrapper.vm.$t('tabs.bindings.resolved-as'));
        expect(wrapper.lis(1).text()).to.contain(wrapper.vm.$t('tabs.bindings.not-resolved'));
    });
});

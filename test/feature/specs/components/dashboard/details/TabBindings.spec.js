import Buefy from 'buefy';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import TabBindings from '@/components/dashboard/details/TabBindings';
import { dummyTrackerData } from './../../../../../fixtures/es6';

describe('TabBindings Component', () => {
    let wrapper;
    let dummyTracker;

    beforeEach(() => {
        dummyTracker = new Tracker(dummyTrackerData);

        let localVue = createLocalVue();
        localVue.use(Buefy);

        wrapper = mount(TabBindings, {
            localVue,
            i18n,
            propsData: {
                tracker: dummyTracker,
            },
        });
    });

    it('has bindings', () => {
        expect(wrapper.findAll('li').length).to.equal(dummyTracker.countBindings());

        expect(wrapper.findAll('li').at(0).text()).to.contain(dummyTracker.bindings[0].abstract);
        expect(wrapper.findAll('li').at(0).text()).to.contain(wrapper.vm.$t('tabs.bindings.resolved-as'));
        expect(wrapper.findAll('li').at(0).text()).to.not.contain(wrapper.vm.$t('tabs.bindings.not-resolved'));
        expect(wrapper.findAll('li').at(0).text()).to.contain(dummyTracker.bindings[0].resolved);

        expect(wrapper.findAll('li').at(1).text()).to.contain(dummyTracker.bindings[1].abstract);
        expect(wrapper.findAll('li').at(1).text()).to.not.contain(wrapper.vm.$t('tabs.bindings.resolved-as'));
        expect(wrapper.findAll('li').at(1).text()).to.contain(wrapper.vm.$t('tabs.bindings.not-resolved'));
    });
});

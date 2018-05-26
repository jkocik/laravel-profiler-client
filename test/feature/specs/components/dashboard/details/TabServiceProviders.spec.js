import Buefy from 'buefy';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import TabServiceProviders from '@/components/dashboard/details/TabServiceProviders';
import { dummyTrackerData } from './../../../../../fixtures/es6';

describe('TabServiceProviders Component', () => {
    let wrapper;
    let dummyTracker;

    beforeEach(() => {
        dummyTracker = new Tracker(dummyTrackerData);

        let localVue = createLocalVue();
        localVue.use(Buefy);

        wrapper = mount(TabServiceProviders, {
            localVue,
            i18n,
            propsData: {
                tracker: dummyTracker,
            },
        });
    });

    it('has service providers', () => {
        expect(wrapper.findAll('li').length).to.equal(dummyTracker.countServiceProviders());
        expect(wrapper.findAll('li').at(0).text()).to.contain(dummyTracker.serviceProviders[0]);
    });
});

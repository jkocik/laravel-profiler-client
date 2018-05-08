import Buefy from 'buefy';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import { storeFactory } from '@/store';
import DashboardDetails from '@/components/dashboard/DashboardDetails';

describe('DashboardDetails Component', () => {
    let wrapper;

    beforeEach(() => {
        let localVue = createLocalVue();
        localVue.use(Buefy);

        wrapper = mount(DashboardDetails, {
            localVue,
            store: storeFactory(),
            i18n,
        });
    });

    it('has App tab', (done) => {
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(0).text()).to.contains(wrapper.vm.$t('message.dashboard.details.tabs.app'));
            done();
        });
    });

    it('has Request tab', (done) => {
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(1).text()).to.contains(wrapper.vm.$t('message.dashboard.details.tabs.request'));
            done();
        });
    });

    it('has Response tab', (done) => {
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(2).text()).to.contains(wrapper.vm.$t('message.dashboard.details.tabs.response'));
            done();
        });
    });
});

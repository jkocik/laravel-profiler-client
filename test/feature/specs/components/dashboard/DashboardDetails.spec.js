import Buefy from 'buefy';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import { storeFactory } from '@/store';
import { dummyTrackerData } from './../../../../fixtures/es6';
import DashboardDetails from '@/components/dashboard/DashboardDetails';

describe('DashboardDetails Component', () => {
    let store;
    let wrapper;
    let dummyTracker;

    beforeEach(() => {
        dummyTracker = new Tracker(dummyTrackerData);
        store = storeFactory();
        store.commit('trackers/store', dummyTracker);

        let localVue = createLocalVue();
        localVue.use(Buefy);

        wrapper = mount(DashboardDetails, {
            localVue,
            store,
            i18n,
            propsData: {
                tracker: dummyTracker,
            },
        });
    });

    it('has application tab', (done) => {
        let wrapperTabApplication = wrapper.find({ name: 'TabApplication' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(0).text()).to.contains(wrapper.vm.$t('tab-labels.application'));
            expect(wrapperTabApplication.isVisible()).to.be.true;
            expect(wrapperTabApplication.props().tracker).to.equal(dummyTracker);
            done();
        });
    });

    it('has request tab', (done) => {
        let wrapperTabRequest = wrapper.find({ name: 'TabRequest' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(1).text()).to.contains(wrapper.vm.$t('tab-labels.request'));
            wrapper.findAll('.tabs li a').at(1).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapperTabRequest.isVisible()).to.be.true;
                expect(wrapperTabRequest.props().tracker).to.equal(dummyTracker);
                done();
            });
        });
    });

    it('has response tab', (done) => {
        let wrapperTabResponse = wrapper.find({ name: 'TabResponse' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(2).text()).to.contains(wrapper.vm.$t('tab-labels.response'));
            wrapper.findAll('.tabs li a').at(2).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapperTabResponse.isVisible()).to.be.true;
                expect(wrapperTabResponse.props().tracker).to.equal(dummyTracker);
                done();
            });
        });
    });
});

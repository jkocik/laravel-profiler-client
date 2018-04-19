import Buefy from 'buefy';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import { storeFactory } from '@/store';
import Dashboard from '@/components/Dashboard';
import { dummyTracker, dummyTrackerB } from './../../../fixtures/es6';

describe('Dashboard Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Dashboard, {
            components: {
                [Buefy.Table.name]: Buefy.Table,
            },
            store: storeFactory(),
            i18n,
        });
    });

    it('sees meta data of profiler after data are delivered', (done) => {
        expect(wrapper.find('p').text()).to.contain(wrapper.vm.$t('message.trackers-list-is-empty'));

        wrapper.vm.$store.commit('trackers/store', dummyTracker);

        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('p').exists()).to.be.false;
            expect(wrapper.vm.$store.state.trackers.all).to.have.lengthOf(1);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(1)').text()).to.equal(dummyTracker.id);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(2)').text()).to.equal(dummyTracker.version);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(3)').text()).to.equal(dummyTracker.env);
            done();
        });
    });

    it('sees meta data of profiler in descending order', (done) => {
        wrapper.vm.$store.commit('trackers/store', dummyTracker);
        wrapper.vm.$store.commit('trackers/store', dummyTrackerB);

        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.$store.state.trackers.all).to.have.lengthOf(2);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(1)').text()).to.equal(dummyTrackerB.id);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(2)').text()).to.equal(dummyTrackerB.version);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(3)').text()).to.equal(dummyTrackerB.env);
            expect(wrapper.find('table tr:nth-child(2) td:nth-child(1)').text()).to.equal(dummyTracker.id);
            expect(wrapper.find('table tr:nth-child(2) td:nth-child(2)').text()).to.equal(dummyTracker.version);
            expect(wrapper.find('table tr:nth-child(2) td:nth-child(3)').text()).to.equal(dummyTracker.env);
            done();
        });
    });
});

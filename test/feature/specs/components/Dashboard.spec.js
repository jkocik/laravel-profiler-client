import { mount } from '@vue/test-utils';
import { storeFactory } from '@/store';
import Dashboard from '@/components/Dashboard';
import { dummyTracker, dummyTrackerB } from './../../../fixtures/es6';

describe('Dashboard Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Dashboard, {
            store: storeFactory(),
        });
    });

    it('sees meta data of profiler when data are delivered', () => {
        expect(wrapper.find('p').exists()).to.be.true;
        expect(wrapper.find('table').exists()).to.be.false;

        wrapper.vm.$store.commit('trackers/store', dummyTracker);
        wrapper.vm.$store.commit('trackers/store', dummyTrackerB);

        expect(wrapper.find('p').exists()).to.be.false;
        expect(wrapper.vm.$store.state.trackers.all).to.have.lengthOf(2);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(1)').text()).to.equal(dummyTracker.id);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(2)').text()).to.equal(dummyTracker.version);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(3)').text()).to.equal(dummyTracker.env);
        expect(wrapper.find('table tr:nth-child(2) td:nth-child(1)').text()).to.equal(dummyTrackerB.id);
        expect(wrapper.find('table tr:nth-child(2) td:nth-child(2)').text()).to.equal(dummyTrackerB.version);
        expect(wrapper.find('table tr:nth-child(2) td:nth-child(3)').text()).to.equal(dummyTrackerB.env);
    });
});

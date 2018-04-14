import { mount } from '@vue/test-utils';
import store from '@/store/index';
import Dashboard from '@/components/Dashboard';
import { dummyTracker, dummyTrackerB } from './../../fixtures/trackers';

describe('Dashboard Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Dashboard, {
            store,
        });
    });

    it('sees meta data of profiler', () => {
        store.commit('trackers/store', dummyTracker);
        store.commit('trackers/store', dummyTrackerB);

        expect(store.state.trackers.all).to.have.lengthOf(2);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(1)').text()).to.equal(dummyTracker.id);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(2)').text()).to.equal(dummyTracker.version);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(3)').text()).to.equal(dummyTracker.env);
        expect(wrapper.find('table tr:nth-child(2) td:nth-child(1)').text()).to.equal(dummyTrackerB.id);
        expect(wrapper.find('table tr:nth-child(2) td:nth-child(2)').text()).to.equal(dummyTrackerB.version);
        expect(wrapper.find('table tr:nth-child(2) td:nth-child(3)').text()).to.equal(dummyTrackerB.env);
    });
});

import Buefy from 'buefy';
import { createLocalVue, mount } from '@vue/test-utils';
import Tracker from '@/models/tracker';
import { dummyTrackerData } from './../../../../../fixtures/es6';
import TabHttpRequestServer from '@/components/dashboard/details/TabHttpRequestServer';

describe('TabHttpRequestServer Component', () => {
    let wrapper;
    let dummyTracker;

    beforeEach(() => {
        dummyTracker = new Tracker(dummyTrackerData);

        let localVue = createLocalVue();
        localVue.use(Buefy);

        wrapper = mount(TabHttpRequestServer, {
            localVue,
            propsData: {
                tracker: dummyTracker,
            },
        });
    });

    it('has server data', () => {
        let keys = Object.keys(dummyTracker.request.server);

        expect(wrapper.findAll('tr').length).to.equal(keys.length);
        expect(wrapper.findAll('tr').at(0).text()).to.contain(keys[0]);
        expect(wrapper.findAll('tr').at(0).text()).to.contain(dummyTracker.request.server[keys[0]]);
    });
});

import Buefy from 'buefy';
import { createLocalVue, mount } from '@vue/test-utils';
import Tracker from '@/models/tracker';
import { dummyTrackerData } from './../../../../../fixtures/es6';
import TabConsoleFinishedResponse from '@/components/dashboard/details/TabConsoleFinishedResponse';

describe('TabConsoleFinishedResponse Component', () => {
    let wrapper;
    let dummyTracker;

    beforeEach(() => {
        let meta = { meta: { type: 'command-finished', 'status': 123 } };
        dummyTracker = new Tracker(Object.assign({}, dummyTrackerData, meta));

        let localVue = createLocalVue();
        localVue.use(Buefy);

        wrapper = mount(TabConsoleFinishedResponse, {
            localVue,
            propsData: {
                tracker: dummyTracker,
            },
        });
    });

    it('has exit code', () => {
        expect(wrapper.findAll('li').at(0).text()).to.contain('exitCode');
        expect(wrapper.findAll('li').at(0).text()).to.contain(123);
    });
});

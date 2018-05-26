import Buefy from 'buefy';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import TabPaths from '@/components/dashboard/details/TabPaths';
import { dummyTrackerData } from './../../../../../fixtures/es6';

describe('TabPaths Component', () => {
    let wrapper;
    let dummyTracker;

    beforeEach(() => {
        dummyTracker = new Tracker(dummyTrackerData);

        let localVue = createLocalVue();
        localVue.use(Buefy);

        wrapper = mount(TabPaths, {
            localVue,
            i18n,
            propsData: {
                tracker: dummyTracker,
            },
        });
    });

    it('has paths', () => {
        expect(wrapper.findAll('tr').length).to.equal(dummyTracker.countPaths());
        expect(wrapper.findAll('tr').at(0).text()).to.contain(dummyTracker.paths[0].name.replace(/_/g, ' '));
        expect(wrapper.findAll('tr').at(0).text()).to.contain(dummyTracker.paths[0].path);
    });
});

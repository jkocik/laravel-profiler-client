import Tracker from '@/models/tracker';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabPerformance from '@/components/dashboard/details/TabPerformance';

describe('TabPerformance Component', () => {
    it('has performance summary tab', async () => {
        let tracker = new Tracker(trackerFactory.create());
        let wrapper = mountWithTracker(TabPerformance, tracker);
        let wrapperTabPerformanceSummary = wrapper.find({ name: 'tab-performance-summary' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(0).text()).to.equal('Summary');
        expect(wrapperTabPerformanceSummary.isVisible()).to.be.true;
        expect(wrapperTabPerformanceSummary.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('has performance custom tab', async () => {
        let tracker = new Tracker(trackerFactory.create());
        let wrapper = mountWithTracker(TabPerformance, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(1).text()).to.equal('Custom');

        wrapper.tabs(1).find('a').trigger('click');
        let selectedTab = wrapper.emitted().updateActiveTab.pop().pop();
        wrapper.setProps({ activeTab: selectedTab });
        let wrapperTabPerformanceCustom = wrapper.find({ name: 'tab-performance-custom' });
        expect(wrapperTabPerformanceCustom.isVisible()).to.be.true;
        expect(wrapperTabPerformanceCustom.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('custom tab is enabled only if any custom timer is present', async () => {
        let trackerSource = trackerFactory.create('data.performance.timer', {
            laravel: 1000,
            'custom-time': undefined,
        });
        delete trackerSource.data.performance.timer['custom-time'];
        let tracker = new Tracker(trackerSource);
        let wrapper = mountWithTracker(TabPerformance, tracker);
        let wrapperTabPerformanceCustom = wrapper.find({ name: 'tab-performance-custom' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(1).text()).to.equal('Custom');
        expect(wrapper.tabs(1).classes()).to.contain('is-disabled');
        expect(wrapperTabPerformanceCustom.exists()).to.be.false;
    });
});

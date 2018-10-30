import Tracker from '@/models/tracker';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabPerformanceCustom from '@/components/dashboard/details/TabPerformanceCustom';

describe('TabPerformanceCustom Component', () => {
    it('has custom performance chart', () => {
        let tracker = new Tracker(trackerFactory.create());
        let performanceSpy = sinon.spy(tracker.performance, 'customChartData');

        let wrapper = mountWithTracker(TabPerformanceCustom, tracker);
        let wrapperPerformanceCustomChart = wrapper.find({ name: 'chart-performance-custom' });

        expect(wrapperPerformanceCustomChart.isVisible()).to.be.true;
        expect(wrapperPerformanceCustomChart.find('canvas.chartjs-render-monitor').isVisible()).to.be.true;
        expect(wrapperPerformanceCustomChart.props().tracker).to.equal(wrapper.props().tracker);

        expect(performanceSpy.calledOnce).to.be.true;
    });

    it('has custom performance chart height related to number of custom items', () => {
        let tracker = new Tracker(trackerFactory.create());
        let wrapper = mountWithTracker(TabPerformanceCustom, tracker);

        expect(Object.keys(tracker.performance.custom).length).to.equal(1);
        expect(wrapper.vm.style.height).to.equal('50px');

        let trackerSource = trackerFactory.create('data.performance.timer', {
            laravel: 2000,
            'custom-time': 20,
            'custom-time b': 30,
            'custom-time c': 1234,
        });
        tracker = new Tracker(trackerSource);
        wrapper = mountWithTracker(TabPerformanceCustom, tracker);

        expect(Object.keys(tracker.performance.custom).length).to.equal(3);
        expect(wrapper.vm.style.height).to.equal('150px');
    });
});

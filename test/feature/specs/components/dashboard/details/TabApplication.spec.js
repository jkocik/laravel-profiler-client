import Tracker from '@/models/tracker';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabApplication from '@/components/dashboard/details/TabApplication';

describe('TabApplication Component', () => {
    let tracker;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        wrapper = mountWithTracker(TabApplication, tracker);
    });

    it('has environment', () => {
        expect(wrapper.trs(0).text()).to.contain(tracker.env);
    });

    it('has is running via', () => {
        expect(wrapper.trs(1).text()).to.contain(tracker.running);
    });

    it('has laravel version', () => {
        expect(wrapper.trs(2).text()).to.contain(tracker.laravelVersion);
    });

    it('has php version', () => {
        expect(wrapper.trs(3).text()).to.contain(tracker.phpVersion);
    });

    it('has locale', () => {
        tracker = new Tracker(trackerFactory.create('data.application', { locale: 'test-locale' }));
        wrapper = mountWithTracker(TabApplication, tracker);

        expect(wrapper.trs(4).text()).to.contain('test-locale');
    });

    it('has routes are cached', () => {
        expect(wrapper.trs(5).find('.fa-toggle-on').exists()).to.be.false;
        expect(wrapper.trs(5).find('.fa-toggle-off').exists()).to.be.true;

        tracker = new Tracker(trackerFactory.create('data.application', { routes_are_cached: true }));
        wrapper = mountWithTracker(TabApplication, tracker);

        expect(wrapper.trs(5).find('.fa-toggle-on').exists()).to.be.true;
        expect(wrapper.trs(5).find('.fa-toggle-off').exists()).to.be.false;
    });

    it('has configuration is cached', () => {
        expect(wrapper.trs(6).find('.fa-toggle-on').exists()).to.be.false;
        expect(wrapper.trs(6).find('.fa-toggle-off').exists()).to.be.true;

        tracker = new Tracker(trackerFactory.create('data.application', { configuration_is_cached: true }));
        wrapper = mountWithTracker(TabApplication, tracker);

        expect(wrapper.trs(6).find('.fa-toggle-on').exists()).to.be.true;
        expect(wrapper.trs(6).find('.fa-toggle-off').exists()).to.be.false;
    });

    it('has is down for maintenance', () => {
        expect(wrapper.trs(7).find('.fa-toggle-on').exists()).to.be.false;
        expect(wrapper.trs(7).find('.fa-toggle-off').exists()).to.be.true;

        tracker = new Tracker(trackerFactory.create('data.application', { is_down_for_maintenance: true }));
        wrapper = mountWithTracker(TabApplication, tracker);

        expect(wrapper.trs(7).find('.fa-toggle-on').exists()).to.be.true;
        expect(wrapper.trs(7).find('.fa-toggle-off').exists()).to.be.false;
    });

    it('has should skip middleware', () => {
        expect(wrapper.trs(8).find('.fa-toggle-on').exists()).to.be.false;
        expect(wrapper.trs(8).find('.fa-toggle-off').exists()).to.be.true;

        tracker = new Tracker(trackerFactory.create('data.application', { should_skip_middleware: true }));
        wrapper = mountWithTracker(TabApplication, tracker);

        expect(wrapper.trs(8).find('.fa-toggle-on').exists()).to.be.true;
        expect(wrapper.trs(8).find('.fa-toggle-off').exists()).to.be.false;
    });

    it('has laravel execution time', () => {
        expect(wrapper.trs(9).text()).to.contain(tracker.laravelExecutionTimeForHuman);
    });

    it('has memory usage', () => {
        tracker = new Tracker(trackerFactory.create('meta', { env: 'local' }));
        wrapper = mountWithTracker(TabApplication, tracker);
        expect(wrapper.trs(10).text()).to.contain(tracker.memoryUsageForHuman);
        expect(wrapper.trs(10).find('td:nth-child(2)').classes()).to.not.contain('has-text-grey-lighter');

        tracker = new Tracker(trackerFactory.create('meta', { env: 'testing' }));
        wrapper = mountWithTracker(TabApplication, tracker);
        expect(wrapper.trs(10).text()).to.contain(tracker.memoryUsageForHuman);
        expect(wrapper.trs(10).find('td:nth-child(2)').classes()).to.contain('has-text-grey-lighter');
    });
});

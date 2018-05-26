import Buefy from 'buefy';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import TabApplication from '@/components/dashboard/details/TabApplication';
import { dummyTrackerData } from './../../../../../fixtures/es6';

describe('TabApplication Component', () => {
    let wrapper;
    let localVue;
    let dummyTracker;

    let mountWithTracker = (tracker) => {
        return mount(TabApplication, {
            localVue,
            i18n,
            propsData: {
                tracker,
            },
        });
    };

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(Buefy);

        dummyTracker = new Tracker(dummyTrackerData);

        wrapper = mountWithTracker(dummyTracker);
    });

    it('has environment', () => {
        expect(wrapper.findAll('tr').at(0).text()).to.contain(dummyTracker.env);
    });

    it('has is running via', () => {
        expect(wrapper.findAll('tr').at(1).text()).to.contain(dummyTracker.running);
    });

    it('has laravel version', () => {
        expect(wrapper.findAll('tr').at(2).text()).to.contain(dummyTracker.laravel_version);
    });

    it('has php version', () => {
        expect(wrapper.findAll('tr').at(3).text()).to.contain(dummyTracker.php_version);
    });

    it('has locale', () => {
        wrapper = mountWithTracker(
            new Tracker(Object.assign({}, dummyTrackerData, { data: { application: { locale: 'test-locale' } } }))
        );

        expect(wrapper.findAll('tr').at(4).text()).to.contain('test-locale');
    });

    it('has routes are cached', () => {
        expect(wrapper.findAll('tr').at(5).find('.fa-times').exists()).to.be.true;
        expect(wrapper.findAll('tr').at(5).find('.fa-check').exists()).to.be.false;

        wrapper = mountWithTracker(
            new Tracker(Object.assign({}, dummyTrackerData, { data: { application: { routes_are_cached: true } } }))
        );

        expect(wrapper.findAll('tr').at(5).find('.fa-times').exists()).to.be.false;
        expect(wrapper.findAll('tr').at(5).find('.fa-check').exists()).to.be.true;
    });

    it('has configuration is cached', () => {
        expect(wrapper.findAll('tr').at(6).find('.fa-times').exists()).to.be.true;
        expect(wrapper.findAll('tr').at(6).find('.fa-check').exists()).to.be.false;

        wrapper = mountWithTracker(
            new Tracker(Object.assign({}, dummyTrackerData, { data: { application: { configuration_is_cached: true } } }))
        );

        expect(wrapper.findAll('tr').at(6).find('.fa-times').exists()).to.be.false;
        expect(wrapper.findAll('tr').at(6).find('.fa-check').exists()).to.be.true;
    });

    it('has is down for maintenance', () => {
        expect(wrapper.findAll('tr').at(7).find('.fa-times').exists()).to.be.true;
        expect(wrapper.findAll('tr').at(7).find('.fa-check').exists()).to.be.false;

        wrapper = mountWithTracker(
            new Tracker(Object.assign({}, dummyTrackerData, { data: { application: { is_down_for_maintenance: true } } }))
        );

        expect(wrapper.findAll('tr').at(7).find('.fa-times').exists()).to.be.false;
        expect(wrapper.findAll('tr').at(7).find('.fa-check').exists()).to.be.true;
    });

    it('has should skip middleware', () => {
        expect(wrapper.findAll('tr').at(8).find('.fa-times').exists()).to.be.true;
        expect(wrapper.findAll('tr').at(8).find('.fa-check').exists()).to.be.false;

        wrapper = mountWithTracker(
            new Tracker(Object.assign({}, dummyTrackerData, { data: { application: { should_skip_middleware: true } } }))
        );

        expect(wrapper.findAll('tr').at(8).find('.fa-times').exists()).to.be.false;
        expect(wrapper.findAll('tr').at(8).find('.fa-check').exists()).to.be.true;
    });
});

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

    let textOfP = (name) => {
        return wrapper.findAll('p').filter((p) => {
            return p.find('label').text() === wrapper.vm.$t(`tabs.application.${name}`);
        }).at(0).text();
    };

    let textOfSpan = (name) => {
        return wrapper.findAll('p').filter((p) => {
            return p.find('label').text() === wrapper.vm.$t(`tabs.application.${name}`);
        }).at(0).find('span').text();
    };

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
        expect(wrapper.text()).to.contain(dummyTracker.env);
    });

    it('has is running via', () => {
        expect(wrapper.text()).to.contain(dummyTracker.running);
    });

    it('has laravel version', () => {
        expect(wrapper.text()).to.contain(dummyTracker.laravel_version);
    });

    it('has php version', () => {
        expect(wrapper.text()).to.contain(dummyTracker.php_version);
    });

    it('has locale', () => {
        wrapper = mountWithTracker(
            new Tracker(Object.assign({}, dummyTrackerData, { data: { application: { locale: 'test-locale' } } }))
        );

        expect(textOfP('locale')).to.contain('test-locale');
    });

    it('has routes are cached', () => {
        expect(textOfSpan('routes-are-cached')).to.contain(wrapper.vm.$t('yes-no.no'));

        wrapper = mountWithTracker(
            new Tracker(Object.assign({}, dummyTrackerData, { data: { application: { routes_are_cached: true } } }))
        );

        expect(textOfSpan('routes-are-cached')).to.contain(wrapper.vm.$t('yes-no.yes'));
    });

    it('has configuration is cached', () => {
        expect(textOfSpan('configuration-is-cached')).to.contain(wrapper.vm.$t('yes-no.no'));

        wrapper = mountWithTracker(
            new Tracker(Object.assign({}, dummyTrackerData, { data: { application: { configuration_is_cached: true } } }))
        );

        expect(textOfSpan('configuration-is-cached')).to.contain(wrapper.vm.$t('yes-no.yes'));
    });

    it('has is down for maintenance', () => {
        expect(textOfSpan('is-down-for-maintenance')).to.contain(wrapper.vm.$t('yes-no.no'));

        wrapper = mountWithTracker(
            new Tracker(Object.assign({}, dummyTrackerData, { data: { application: { is_down_for_maintenance: true } } }))
        );

        expect(textOfSpan('is-down-for-maintenance')).to.contain(wrapper.vm.$t('yes-no.yes'));
    });

    it('has service providers', () => {
        expect(wrapper.findAll('h2').at(0).text()).to.contain(
            `${wrapper.vm.$t('tabs.application.service-providers')} (${dummyTracker.serviceProviders.length})`
        );

        let wrapperServiceProviders = wrapper.find('ul.service-providers');

        expect(wrapperServiceProviders.findAll('li').at(0).text()).to.contain(dummyTracker.serviceProviders[0]);
    });

    it('service providers list is visible only if any service provider is present', () => {
        let data = Object.assign({}, dummyTrackerData.data, { serviceProviders: [] });

        wrapper = mountWithTracker(
            new Tracker(Object.assign({}, dummyTrackerData, { data }))
        );

        expect(wrapper.findAll('h2').at(0).text()).to.contain(
            `${wrapper.vm.$t('tabs.application.service-providers')} (0)`
        );
        expect(wrapper.find('ul.service-providers').exists()).to.be.false;
    });

    it('has bindings', () => {
        expect(wrapper.findAll('h2').at(1).text()).to.contain(
            `${wrapper.vm.$t('tabs.application.bindings')} (${dummyTracker.bindings.length})`
        );

        let wrapperBindings = wrapper.find('ul.bindings');

        expect(wrapperBindings.findAll('li').at(0).text()).to.contain(dummyTracker.bindings[0].abstract);
        expect(wrapperBindings.findAll('li').at(0).text()).to.contain(wrapper.vm.$t('tabs.application.resolved-as'));
        expect(wrapperBindings.findAll('li').at(0).text()).to.not.contain(wrapper.vm.$t('tabs.application.not-resolved'));
        expect(wrapperBindings.findAll('li').at(0).text()).to.contain(dummyTracker.bindings[0].resolved);

        expect(wrapperBindings.findAll('li').at(1).text()).to.contain(dummyTracker.bindings[1].abstract);
        expect(wrapperBindings.findAll('li').at(1).text()).to.not.contain(wrapper.vm.$t('tabs.application.resolved-as'));
        expect(wrapperBindings.findAll('li').at(1).text()).to.contain(wrapper.vm.$t('tabs.application.not-resolved'));
    });

    it('bindings list is visible only if any binding is present', () => {
        let data = Object.assign({}, dummyTrackerData.data, { bindings: [] });

        wrapper = mountWithTracker(
            new Tracker(Object.assign({}, dummyTrackerData, { data }))
        );

        expect(wrapper.findAll('h2').at(1).text()).to.contain(
            `${wrapper.vm.$t('tabs.application.bindings')} (0)`
        );
        expect(wrapper.find('ul.bindings').exists()).to.be.false;
    });

    it('has paths', () => {
        expect(wrapper.findAll('h2').at(2).text()).to.contain(
            `${wrapper.vm.$t('tabs.application.paths')} (${dummyTracker.paths.length})`
        );

        let wrapperPaths = wrapper.find('ul.paths');

        expect(wrapperPaths.findAll('li').at(0).text()).to.contain(dummyTracker.paths[0].name.replace(/_/g, ' '));
        expect(wrapperPaths.findAll('li').at(0).text()).to.contain(dummyTracker.paths[0].path);
    });

    it('paths list is visible only if any path is present', () => {
        let data = Object.assign({}, dummyTrackerData.data, { paths: [] });

        wrapper = mountWithTracker(
            new Tracker(Object.assign({}, dummyTrackerData, { data }))
        );

        expect(wrapper.findAll('h2').at(2).text()).to.contain(
            `${wrapper.vm.$t('tabs.application.paths')} (0)`
        );
        expect(wrapper.find('ul.paths').exists()).to.be.false;
    });
});

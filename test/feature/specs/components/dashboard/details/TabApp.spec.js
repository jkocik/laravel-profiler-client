import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import TabApp from '@/components/dashboard/details/TabApp';
import { dummyTrackerData, dummyTrackerDataB } from './../../../../../fixtures/es6';

describe('TabApp Component', () => {
    let wrapper;
    let dummyTracker;

    beforeEach(() => {
        dummyTracker = new Tracker(dummyTrackerData);

        wrapper = mount(TabApp, {
            i18n,
            propsData: {
                tracker: dummyTracker,
            },
        });
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

    it('has bindings', () => {
        expect(wrapper.findAll('h2').at(0).text()).to.contain(`${wrapper.vm.$t('tabs.app.bindings')} (${dummyTracker.bindings.length})`);

        expect(wrapper.findAll('li').at(0).text()).to.contain(dummyTracker.bindings[0].abstract);
        expect(wrapper.findAll('li').at(0).text()).to.contain(wrapper.vm.$t('tabs.app.resolved-as'));
        expect(wrapper.findAll('li').at(0).text()).to.not.contain(wrapper.vm.$t('tabs.app.not-resolved'));
        expect(wrapper.findAll('li').at(0).text()).to.contain(dummyTracker.bindings[0].resolved);

        expect(wrapper.findAll('li').at(1).text()).to.contain(dummyTracker.bindings[1].abstract);
        expect(wrapper.findAll('li').at(1).text()).to.not.contain(wrapper.vm.$t('tabs.app.resolved-as'));
        expect(wrapper.findAll('li').at(1).text()).to.contain(wrapper.vm.$t('tabs.app.not-resolved'));
    });

    it('bindings list is visible only if any bindings are present', () => {
        wrapper = mount(TabApp, {
            i18n,
            propsData: {
                tracker: new Tracker(dummyTrackerDataB),
            },
        });

        expect(wrapper.find('ul').exists()).to.be.false;
    });
});

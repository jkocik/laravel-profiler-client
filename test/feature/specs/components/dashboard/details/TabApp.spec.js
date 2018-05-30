import Buefy from 'buefy';
import TreeView from 'vue-json-tree-view';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import TabApp from '@/components/dashboard/details/TabApp';
import { dummyTrackerData } from './../../../../../fixtures/es6';

describe('TabApp Component', () => {
    let wrapper;
    let localVue;
    let dummyTracker;

    let mountWithTracker = (tracker) => {
        return mount(TabApp, {
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
        localVue.use(TreeView);

        dummyTracker = new Tracker(dummyTrackerData);

        wrapper = mountWithTracker(dummyTracker);
    });

    it('has application tab', (done) => {
        let wrapperTabApplication = wrapper.find({ name: 'tab-application' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(0).text()).to.equal(wrapper.vm.$t('tab-labels.application'));
            expect(wrapperTabApplication.isVisible()).to.be.true;
            expect(wrapperTabApplication.props().tracker).to.equal(dummyTracker);
            done();
        });
    });

    it('has config tab', (done) => {
        let data = Object.assign({}, dummyTrackerData.data, { config: { 1: 'a', 2: 'b', 3: 'c' } });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));
        wrapper = mountWithTracker(tracker);

        let wrapperTabConfig = wrapper.find({ name: 'tab-config' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(1).text()).to.equal(`${wrapper.vm.$t('tab-labels.config')} (3)`);
            wrapper.findAll('.tabs li a').at(1).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapperTabConfig.isVisible()).to.be.true;
                expect(wrapperTabConfig.props().tracker).to.equal(wrapper.props().tracker);
                done();
            });
        });
    });

    it('config tab is enabled only if any config is present', (done) => {
        let data = Object.assign({}, dummyTrackerData.data, { config: undefined });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));
        wrapper = mountWithTracker(tracker);

        let wrapperTabConfig = wrapper.find({ name: 'tab-config' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(1).text()).to.equal(wrapper.vm.$t('tab-labels.config'));
            expect(wrapper.findAll('.tabs li').at(1).classes()).to.contain('is-disabled');
            expect(wrapperTabConfig.exists()).to.be.false;
            done();
        });
    });

    it('has service providers tab', (done) => {
        let data = Object.assign({}, dummyTrackerData.data, { serviceProviders: [1, 2, 3] });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));
        wrapper = mountWithTracker(tracker);

        let wrapperTabServiceProviders = wrapper.find({ name: 'tab-service-providers' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(2).text()).to.equal(`${wrapper.vm.$t('tab-labels.service-providers')} (3)`);
            wrapper.findAll('.tabs li a').at(2).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapperTabServiceProviders.isVisible()).to.be.true;
                expect(wrapperTabServiceProviders.props().tracker).to.equal(wrapper.props().tracker);
                done();
            });
        });
    });

    it('service providers tab is enabled only if any service provider is present', (done) => {
        let data = Object.assign({}, dummyTrackerData.data, { serviceProviders: undefined });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));
        wrapper = mountWithTracker(tracker);

        let wrapperTabServiceProviders = wrapper.find({ name: 'tab-service-providers' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(2).text()).to.equal(wrapper.vm.$t('tab-labels.service-providers'));
            expect(wrapper.findAll('.tabs li').at(2).classes()).to.contain('is-disabled');
            expect(wrapperTabServiceProviders.exists()).to.be.false;
            done();
        });
    });

    it('has bindings tab', (done) => {
        let data = Object.assign({}, dummyTrackerData.data, { bindings: [1, 2, 3] });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));
        wrapper = mountWithTracker(tracker);

        let wrapperTabBindings = wrapper.find({ name: 'tab-bindings' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(3).text()).to.equal(`${wrapper.vm.$t('tab-labels.bindings')} (3)`);
            wrapper.findAll('.tabs li a').at(3).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapperTabBindings.isVisible()).to.be.true;
                expect(wrapperTabBindings.props().tracker).to.equal(wrapper.props().tracker);
                done();
            });
        });
    });

    it('bandings tab is enabled only if any binding is present', (done) => {
        let data = Object.assign({}, dummyTrackerData.data, { bindings: undefined });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));
        wrapper = mountWithTracker(tracker);

        let wrapperTabBindings = wrapper.find({ name: 'tab-bindings' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(3).text()).to.equal(wrapper.vm.$t('tab-labels.bindings'));
            expect(wrapper.findAll('.tabs li').at(3).classes()).to.contain('is-disabled');
            expect(wrapperTabBindings.exists()).to.be.false;
            done();
        });
    });

    it('has paths tab', (done) => {
        let data = Object.assign({}, dummyTrackerData.data, { paths: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));
        wrapper = mountWithTracker(tracker);

        let wrapperTabPaths = wrapper.find({ name: 'tab-paths' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(4).text()).to.equal(`${wrapper.vm.$t('tab-labels.paths')} (3)`);
            wrapper.findAll('.tabs li a').at(4).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapperTabPaths.isVisible()).to.be.true;
                expect(wrapperTabPaths.props().tracker).to.equal(wrapper.props().tracker);
                done();
            });
        });
    });

    it('paths tab is enabled only if any path is present', (done) => {
        let data = Object.assign({}, dummyTrackerData.data, { paths: undefined });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));
        wrapper = mountWithTracker(tracker);

        let wrapperTabPaths = wrapper.find({ name: 'tab-paths' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(4).text()).to.equal(wrapper.vm.$t('tab-labels.paths'));
            expect(wrapper.findAll('.tabs li').at(4).classes()).to.contain('is-disabled');
            expect(wrapperTabPaths.exists()).to.be.false;
            done();
        });
    });
});

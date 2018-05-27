import Buefy from 'buefy';
import TreeView from 'vue-json-tree-view';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import { storeFactory } from '@/store';
import { dummyTrackerData } from './../../../../fixtures/es6';
import DashboardDetails from '@/components/dashboard/DashboardDetails';

describe('DashboardDetails Component', () => {
    let store;
    let wrapper;
    let localVue;
    let dummyTracker;

    let mountWithTracker = (tracker) => {
        store = storeFactory();
        store.commit('trackers/store', tracker);

        return mount(DashboardDetails, {
            localVue,
            store,
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

    it('has app tab', (done) => {
        let wrapperTabApp = wrapper.find({ name: 'TabApp' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(0).text()).to.equal(wrapper.vm.$t('tab-labels.app'));
            expect(wrapperTabApp.isVisible()).to.be.true;
            expect(wrapperTabApp.props().tracker).to.equal(dummyTracker);
            done();
        });
    });

    it('has http request tab enabled when type equals http', (done) => {
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'http' } }));
        wrapper = mountWithTracker(tracker);
        let wrapperTabRequest = wrapper.find({ name: 'tab-http-request' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(1).text()).to.equal(wrapper.vm.$t('tab-labels.http-request'));
            wrapper.findAll('.tabs li a').at(1).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapper.findAll('.tabs li').at(1).classes()).to.not.contain('is-disabled');
                expect(wrapperTabRequest.isVisible()).to.be.true;
                expect(wrapperTabRequest.props().tracker).to.equal(tracker);
                expect(wrapper.find({ name: 'tab-console-finished-request' }).exists()).to.be.false;
                done();
            });
        });
    });

    it('has console finished request tab enabled when type equals command-finished', (done) => {
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'command-finished' } }));
        wrapper = mountWithTracker(tracker);
        let wrapperTabRequest = wrapper.find({ name: 'tab-console-finished-request' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(1).text()).to.equal(wrapper.vm.$t('tab-labels.console-finished-request'));
            wrapper.findAll('.tabs li a').at(1).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapper.findAll('.tabs li').at(1).classes()).to.not.contain('is-disabled');
                expect(wrapperTabRequest.isVisible()).to.be.true;
                expect(wrapperTabRequest.props().tracker).to.equal(tracker);
                expect(wrapper.find({ name: 'tab-http-request' }).exists()).to.be.false;
                done();
            });
        });
    });

    it('has request tab disabled when type equals command-starting', (done) => {
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'command-starting' } }));
        wrapper = mountWithTracker(tracker);

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(1).text()).to.equal(wrapper.vm.$t('tab-labels.console-starting-request'));
            expect(wrapper.findAll('.tabs li').at(1).classes()).to.contain('is-disabled');
            expect(wrapper.find({ name: 'tab-http-request' }).exists()).to.be.false;
            expect(wrapper.find({ name: 'tab-console-finished-request' }).exists()).to.be.false;
            done();
        });
    });

    it('has request tab disabled when type equals null', (done) => {
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: null } }));
        wrapper = mountWithTracker(tracker);

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(1).text()).to.equal(wrapper.vm.$t('tab-labels.null-request'));
            expect(wrapper.findAll('.tabs li').at(1).classes()).to.contain('is-disabled');
            expect(wrapper.find({ name: 'tab-http-request' }).exists()).to.be.false;
            expect(wrapper.find({ name: 'tab-console-finished-request' }).exists()).to.be.false;
            done();
        });
    });
});

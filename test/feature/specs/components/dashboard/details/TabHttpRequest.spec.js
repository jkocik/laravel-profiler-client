import Buefy from 'buefy';
import TreeView from 'vue-json-tree-view';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import { dummyTrackerData } from './../../../../../fixtures/es6';
import TabHttpRequest from '@/components/dashboard/details/TabHttpRequest';

describe('TabHttpRequest Component', () => {
    let wrapper;
    let localVue;
    let dummyTracker;

    let mountWithTracker = (tracker) => {
        return mount(TabHttpRequest, {
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

    it('has request summary tab', (done) => {
        let wrapperTabHttpRequestSummary = wrapper.find({ name: 'tab-http-request-summary' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(0).text()).to.equal(wrapper.vm.$t('tab-labels.http-request-summary'));
            expect(wrapperTabHttpRequestSummary.isVisible()).to.be.true;
            expect(wrapperTabHttpRequestSummary.props().tracker).to.equal(dummyTracker);
            done();
        });
    });

    it('has request input tab', (done) => {
        let wrapperTabHttpRequestInput = wrapper.find({ name: 'tab-http-request-input' });
        let count = wrapperTabHttpRequestInput.props().tracker.request.countInput();
        expect(count > 0).to.be.true;

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(1).text()).to.equal(wrapper.vm.$t('tab-labels.http-request-input', { count }));
            expect(wrapper.findAll('.tabs li').at(1).text()).to.not.contain('{count}');
            wrapper.findAll('.tabs li a').at(1).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapperTabHttpRequestInput.isVisible()).to.be.true;
                expect(wrapperTabHttpRequestInput.props().tracker).to.equal(wrapper.props().tracker);
                done();
            });
        });
    });

    it('input tab is enabled only if any input or files is / are present', (done) => {
        let request = Object.assign({}, dummyTrackerData.data.request, { input: [], files: [] });
        let data = Object.assign({}, dummyTrackerData.data, { request });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));
        wrapper = mountWithTracker(tracker);

        let wrapperTabHttpRequestInput = wrapper.find({ name: 'tab-http-request-input' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(1).text()).to.equal(wrapper.vm.$t('tab-labels.http-request-input', { count: 0 }));
            expect(wrapper.findAll('.tabs li').at(1).text()).to.not.contain('{count}');
            expect(wrapper.findAll('.tabs li').at(1).classes()).to.contain('is-disabled');
            expect(wrapperTabHttpRequestInput.exists()).to.be.false;
            done();
        });
    });

    it('has session tab', (done) => {
        let wrapperTabHttpSession = wrapper.find({ name: 'tab-http-session' });
        let count = wrapperTabHttpSession.props().tracker.countSession();
        expect(count > 0).to.be.true;

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(2).text()).to.equal(wrapper.vm.$t('tab-labels.http-session', { count }));
            expect(wrapper.findAll('.tabs li').at(2).text()).to.not.contain('{count}');
            wrapper.findAll('.tabs li a').at(2).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapperTabHttpSession.isVisible()).to.be.true;
                expect(wrapperTabHttpSession.props().tracker).to.equal(wrapper.props().tracker);
                done();
            });
        });
    });

    it('session tab is enabled only if any session data are present', (done) => {
        let data = Object.assign({}, dummyTrackerData.data, { session: [] });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));
        wrapper = mountWithTracker(tracker);

        let wrapperTabHttpSession = wrapper.find({ name: 'tab-http-session' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(2).text()).to.equal(wrapper.vm.$t('tab-labels.http-session', { count: 0 }));
            expect(wrapper.findAll('.tabs li').at(2).text()).to.not.contain('{count}');
            expect(wrapper.findAll('.tabs li').at(2).classes()).to.contain('is-disabled');
            expect(wrapperTabHttpSession.exists()).to.be.false;
            done();
        });
    });

    it('has route tab', (done) => {
        let wrapperTabHttpRoute = wrapper.find({ name: 'tab-http-route' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(3).text()).to.equal(wrapper.vm.$t('tab-labels.http-route'));
            wrapper.findAll('.tabs li a').at(3).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapperTabHttpRoute.isVisible()).to.be.true;
                expect(wrapperTabHttpRoute.props().tracker).to.equal(wrapper.props().tracker);
                done();
            });
        });
    });

    it('route tab is enabled only if route is present', (done) => {
        let data = Object.assign({}, dummyTrackerData.data, { route: [] });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));
        wrapper = mountWithTracker(tracker);

        let wrapperTabHttpRoute = wrapper.find({ name: 'tab-http-route' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(3).text()).to.equal(wrapper.vm.$t('tab-labels.http-route'));
            expect(wrapper.findAll('.tabs li').at(3).classes()).to.contain('is-disabled');
            expect(wrapperTabHttpRoute.exists()).to.be.false;
            done();
        });
    });

    it('has request server tab', (done) => {
        let wrapperTabHttpRequestServer = wrapper.find({ name: 'tab-http-request-server' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(4).text()).to.equal(wrapper.vm.$t('tab-labels.http-request-server'));
            wrapper.findAll('.tabs li a').at(4).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapperTabHttpRequestServer.isVisible()).to.be.true;
                expect(wrapperTabHttpRequestServer.props().tracker).to.equal(wrapper.props().tracker);
                done();
            });
        });
    });
});

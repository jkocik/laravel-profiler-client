import Buefy from 'buefy';
import TreeView from 'vue-json-tree-view';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import { dummyTrackerData } from './../../../../../fixtures/es6';
import TabHttpRequest from '@/components/dashboard/details/TabHttpRequest';

describe('TabHttpRequest Component', () => {
    let wrapper;
    let dummyTracker;

    beforeEach(() => {
        dummyTracker = new Tracker(dummyTrackerData);

        let localVue = createLocalVue();
        localVue.use(Buefy);
        localVue.use(TreeView);

        wrapper = mount(TabHttpRequest, {
            localVue,
            i18n,
            propsData: {
                tracker: dummyTracker,
            },
        });
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
            wrapper.findAll('.tabs li a').at(1).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapperTabHttpRequestInput.isVisible()).to.be.true;
                expect(wrapperTabHttpRequestInput.props().tracker).to.equal(wrapper.props().tracker);
                done();
            });
        });
    });

    it('input tab is enabled only if any input or files is / are present', (done) => {
        let wrapperTabHttpRequestInput = wrapper.find({ name: 'tab-http-request-input' });
        let data = Object.assign({}, dummyTrackerData.data, { request: { input: [], files: [] } });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));
        wrapper.setData({ request: tracker.request });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(1).text()).to.equal(wrapper.vm.$t('tab-labels.http-request-input', { count: 0 }));
            expect(wrapper.findAll('.tabs li').at(1).classes()).to.contain('is-disabled');
            expect(wrapperTabHttpRequestInput.exists()).to.be.false;
            done();
        });
    });

    it('has route tab', (done) => {
        let wrapperTabHttpRoute = wrapper.find({ name: 'tab-http-route' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(2).text()).to.equal(wrapper.vm.$t('tab-labels.http-route'));
            wrapper.findAll('.tabs li a').at(2).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapperTabHttpRoute.isVisible()).to.be.true;
                expect(wrapperTabHttpRoute.props().tracker).to.equal(wrapper.props().tracker);
                done();
            });
        });
    });

    it('has request server tab', (done) => {
        let wrapperTabHttpRequestServer = wrapper.find({ name: 'tab-http-request-server' });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(3).text()).to.equal(wrapper.vm.$t('tab-labels.http-request-server'));
            wrapper.findAll('.tabs li a').at(3).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapperTabHttpRequestServer.isVisible()).to.be.true;
                expect(wrapperTabHttpRequestServer.props().tracker).to.equal(wrapper.props().tracker);
                done();
            });
        });
    });
});

import Tracker from '@/models/tracker';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabHttpRequest from '@/components/dashboard/details/TabHttpRequest';

describe('TabHttpRequest Component', () => {
    it('has request summary tab', async () => {
        let tracker = new Tracker(trackerFactory.create());
        let wrapper = mountWithTracker(TabHttpRequest, tracker);
        let wrapperTabHttpRequestSummary = wrapper.find({ name: 'tab-http-request-summary' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(0).text()).to.equal('Request');
        expect(wrapperTabHttpRequestSummary.isVisible()).to.be.true;
        expect(wrapperTabHttpRequestSummary.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('has request input tab', async () => {
        let tracker = new Tracker(
            trackerFactory
                .set('data.request', { input: { 1: 'a', 2: 'b', 3: 'c', 4: 'd' } })
                .set('data.request', { files: { 1: 'x', 2: 'y', 3: 'z' } })
                .create()
        );
        let wrapper = mountWithTracker(TabHttpRequest, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(1).text()).to.equal('Input (7)');

        wrapper.tabs(1).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabHttpRequestInput = wrapper.find({ name: 'tab-http-request-input' });
        expect(wrapperTabHttpRequestInput.isVisible()).to.be.true;
        expect(wrapperTabHttpRequestInput.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('input tab is enabled only if any input or files is / are present', async () => {
        let tracker = new Tracker(
            trackerFactory
                .set('data.request', { input: [] })
                .set('data.request', { files: [] })
                .create()
        );
        let wrapper = mountWithTracker(TabHttpRequest, tracker);
        let wrapperTabHttpRequestInput = wrapper.find({ name: 'tab-http-request-input' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(1).text()).to.equal('Input (0)');
        expect(wrapper.tabs(1).classes()).to.contain('is-disabled');
        expect(wrapperTabHttpRequestInput.exists()).to.be.false;
    });

    it('has session tab', async () => {
        let tracker = new Tracker(trackerFactory.set('data', { session: { 1: 'a', 2: 'b', 3: 'c' } }).create());
        let wrapper = mountWithTracker(TabHttpRequest, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(2).text()).to.equal('Session (3)');

        wrapper.tabs(2).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabHttpSession = wrapper.find({ name: 'tab-http-session' });
        expect(wrapperTabHttpSession.isVisible()).to.be.true;
        expect(wrapperTabHttpSession.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('session tab is enabled only if any session data are present', async () => {
        let tracker = new Tracker(trackerFactory.set('data', { session: [] }).create());
        let wrapper = mountWithTracker(TabHttpRequest, tracker);
        let wrapperTabHttpSession = wrapper.find({ name: 'tab-http-session' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(2).text()).to.equal('Session (0)');
        expect(wrapper.tabs(2).classes()).to.contain('is-disabled');
        expect(wrapperTabHttpSession.exists()).to.be.false;
    });

    it('session tab has number of session data only if session data are provided', async () => {
        let trackerSource = trackerFactory.create('data', { session: [] });
        delete trackerSource.data.session;
        let tracker = new Tracker(trackerSource);
        let wrapper = mountWithTracker(TabHttpRequest, tracker);
        let wrapperTabHttpSession = wrapper.find({ name: 'tab-http-session' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(2).text()).to.equal('Session');
        expect(wrapper.tabs(2).classes()).to.contain('is-disabled');
        expect(wrapperTabHttpSession.exists()).to.be.false;
    });

    it('has route tab', async () => {
        let tracker = new Tracker(trackerFactory.create());
        let wrapper = mountWithTracker(TabHttpRequest, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(3).text()).to.equal('Route');

        wrapper.tabs(3).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabHttpRoute = wrapper.find({ name: 'tab-http-route' });
        expect(wrapperTabHttpRoute.isVisible()).to.be.true;
        expect(wrapperTabHttpRoute.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('route tab is enabled only if route is present', async () => {
        let tracker = new Tracker(trackerFactory.set('data', { route: [] }).create());
        let wrapper = mountWithTracker(TabHttpRequest, tracker);
        let wrapperTabHttpRoute = wrapper.find({ name: 'tab-http-route' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(3).text()).to.equal('Route');
        expect(wrapper.tabs(3).classes()).to.contain('is-disabled');
        expect(wrapperTabHttpRoute.exists()).to.be.false;
    });

    it('has request server tab', async () => {
        let tracker = new Tracker(trackerFactory.create());
        let wrapper = mountWithTracker(TabHttpRequest, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(4).text()).to.equal('Server');

        wrapper.tabs(4).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabHttpRequestServer = wrapper.find({ name: 'tab-http-request-server' });
        expect(wrapperTabHttpRequestServer.isVisible()).to.be.true;
        expect(wrapperTabHttpRequestServer.props().tracker).to.equal(wrapper.props().tracker);
    });
});

import Tracker from '@/models/tracker';
import DashboardDetails from '@/components/dashboard/DashboardDetails';
import { trackerFactory, mountWithTracker } from './../../test-helper';

describe('DashboardDetails Component', () => {
    it('has app tab', async () => {
        let tracker = new Tracker(trackerFactory.create());
        let wrapper = mountWithTracker(DashboardDetails, tracker);
        let wrapperTabApp = wrapper.find({ name: 'tab-app' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(0).text()).to.equal('App');
        expect(wrapperTabApp.isVisible()).to.be.true;
        expect(wrapperTabApp.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('has http request tab enabled when type equals http', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: 'http' }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(1).text()).to.equal('Request');

        wrapper.tabs(1).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabRequest = wrapper.find({ name: 'tab-http-request' });
        expect(wrapper.tabs(1).classes()).to.not.contain('is-disabled');
        expect(wrapperTabRequest.isVisible()).to.be.true;
        expect(wrapperTabRequest.props().tracker).to.equal(wrapper.props().tracker);
        expect(wrapper.find({ name: 'tab-console-finished-request' }).exists()).to.be.false;
    });

    it('has console finished request tab enabled when type equals command-finished', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: 'command-finished' }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(1).text()).to.equal('Input');

        wrapper.tabs(1).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabRequest = wrapper.find({ name: 'tab-console-finished-request' });
        expect(wrapper.tabs(1).classes()).to.not.contain('is-disabled');
        expect(wrapperTabRequest.isVisible()).to.be.true;
        expect(wrapperTabRequest.props().tracker).to.equal(wrapper.props().tracker);
        expect(wrapper.find({ name: 'tab-http-request' }).exists()).to.be.false;
    });

    it('has request tab disabled when type equals command-starting', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: 'command-starting' }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(1).text()).to.equal('Input');
        expect(wrapper.tabs(1).classes()).to.contain('is-disabled');
        expect(wrapper.find({ name: 'tab-http-request' }).exists()).to.be.false;
        expect(wrapper.find({ name: 'tab-console-finished-request' }).exists()).to.be.false;
    });

    it('has request tab disabled when type equals null', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: null }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(1).text()).to.equal('Request');
        expect(wrapper.tabs(1).classes()).to.contain('is-disabled');
        expect(wrapper.find({ name: 'tab-http-request' }).exists()).to.be.false;
        expect(wrapper.find({ name: 'tab-console-finished-request' }).exists()).to.be.false;
    });

    it('has http response tab enabled when type equals http', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: 'http' }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(2).text()).to.equal('Response');

        wrapper.tabs(2).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabResponse = wrapper.find({ name: 'tab-http-response' });
        expect(wrapper.tabs(2).classes()).to.not.contain('is-disabled');
        expect(wrapperTabResponse.isVisible()).to.be.true;
        expect(wrapperTabResponse.props().tracker).to.equal(wrapper.props().tracker);
        expect(wrapper.find({ name: 'tab-console-finished-response' }).exists()).to.be.false;
    });

    it('has console finished response tab enabled when type equals command-finished', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: 'command-finished' }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(2).text()).to.equal('Output');

        wrapper.tabs(2).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabResponse = wrapper.find({ name: 'tab-console-finished-response' });
        expect(wrapper.tabs(2).classes()).to.not.contain('is-disabled');
        expect(wrapperTabResponse.isVisible()).to.be.true;
        expect(wrapperTabResponse.props().tracker).to.equal(wrapper.props().tracker);
        expect(wrapper.find({ name: 'tab-http-response' }).exists()).to.be.false;
    });

    it('has response tab disabled when type equals command-starting', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: 'command-starting' }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(2).text()).to.equal('Output');
        expect(wrapper.tabs(2).classes()).to.contain('is-disabled');
        expect(wrapper.find({ name: 'tab-http-response' }).exists()).to.be.false;
        expect(wrapper.find({ name: 'tab-console-finished-response' }).exists()).to.be.false;
    });

    it('has response tab disabled when type equals null', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: null }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(2).text()).to.equal('Response');
        expect(wrapper.tabs(2).classes()).to.contain('is-disabled');
        expect(wrapper.find({ name: 'tab-http-response' }).exists()).to.be.false;
        expect(wrapper.find({ name: 'tab-console-finished-response' }).exists()).to.be.false;
    });

    it('has views tab', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { views: [{ name: 'a', path: 'b', data: [] }] }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(3).text()).to.equal('Views (1)');

        wrapper.tabs(3).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabViews = wrapper.find({ name: 'tab-views' });
        expect(wrapperTabViews.isVisible()).to.be.true;
        expect(wrapperTabViews.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('views tab is enabled only if any view is present', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { views: [] }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);
        let wrapperTabViews = wrapper.find({ name: 'tab-views' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(3).text()).to.equal('Views (0)');
        expect(wrapper.tabs(3).classes()).to.contain('is-disabled');
        expect(wrapperTabViews.exists()).to.be.false;
    });
});

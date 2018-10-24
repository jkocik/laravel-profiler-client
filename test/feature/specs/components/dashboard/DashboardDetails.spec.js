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

    it('has performance tab', async () => {
        let tracker = new Tracker(trackerFactory.create());
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(1).text()).to.equal('Performance');

        wrapper.tabs(1).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabPerformance = wrapper.find({ name: 'tab-performance' });
        expect(wrapperTabPerformance.isVisible()).to.be.true;
        expect(wrapperTabPerformance.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('has http request tab enabled when type equals http', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: 'http' }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(2).text()).to.equal('Request');

        wrapper.tabs(2).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabRequest = wrapper.find({ name: 'tab-http-request' });
        expect(wrapper.tabs(2).classes()).to.not.contain('is-disabled');
        expect(wrapperTabRequest.isVisible()).to.be.true;
        expect(wrapperTabRequest.props().tracker).to.equal(wrapper.props().tracker);
        expect(wrapper.find({ name: 'tab-console-finished-request' }).exists()).to.be.false;
    });

    it('has console finished request tab enabled when type equals command-finished', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: 'command-finished' }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(2).text()).to.equal('Input');

        wrapper.tabs(2).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabRequest = wrapper.find({ name: 'tab-console-finished-request' });
        expect(wrapper.tabs(2).classes()).to.not.contain('is-disabled');
        expect(wrapperTabRequest.isVisible()).to.be.true;
        expect(wrapperTabRequest.props().tracker).to.equal(wrapper.props().tracker);
        expect(wrapper.find({ name: 'tab-http-request' }).exists()).to.be.false;
    });

    it('has request tab disabled when type equals command-starting', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: 'command-starting' }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(2).text()).to.equal('Input');
        expect(wrapper.tabs(2).classes()).to.contain('is-disabled');
        expect(wrapper.find({ name: 'tab-http-request' }).exists()).to.be.false;
        expect(wrapper.find({ name: 'tab-console-finished-request' }).exists()).to.be.false;
    });

    it('has request tab disabled when type equals null', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: null }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(2).text()).to.equal('Request');
        expect(wrapper.tabs(2).classes()).to.contain('is-disabled');
        expect(wrapper.find({ name: 'tab-http-request' }).exists()).to.be.false;
        expect(wrapper.find({ name: 'tab-console-finished-request' }).exists()).to.be.false;
    });

    it('has http response tab enabled when type equals http', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: 'http' }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(3).text()).to.equal('Response');

        wrapper.tabs(3).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabResponse = wrapper.find({ name: 'tab-http-response' });
        expect(wrapper.tabs(3).classes()).to.not.contain('is-disabled');
        expect(wrapperTabResponse.isVisible()).to.be.true;
        expect(wrapperTabResponse.props().tracker).to.equal(wrapper.props().tracker);
        expect(wrapper.find({ name: 'tab-console-finished-response' }).exists()).to.be.false;
    });

    it('has console finished response tab enabled when type equals command-finished', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: 'command-finished' }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(3).text()).to.equal('Output');

        wrapper.tabs(3).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabResponse = wrapper.find({ name: 'tab-console-finished-response' });
        expect(wrapper.tabs(3).classes()).to.not.contain('is-disabled');
        expect(wrapperTabResponse.isVisible()).to.be.true;
        expect(wrapperTabResponse.props().tracker).to.equal(wrapper.props().tracker);
        expect(wrapper.find({ name: 'tab-http-response' }).exists()).to.be.false;
    });

    it('has response tab disabled when type equals command-starting', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: 'command-starting' }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(3).text()).to.equal('Output');
        expect(wrapper.tabs(3).classes()).to.contain('is-disabled');
        expect(wrapper.find({ name: 'tab-http-response' }).exists()).to.be.false;
        expect(wrapper.find({ name: 'tab-console-finished-response' }).exists()).to.be.false;
    });

    it('has response tab disabled when type equals null', async () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: null }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(3).text()).to.equal('Response');
        expect(wrapper.tabs(3).classes()).to.contain('is-disabled');
        expect(wrapper.find({ name: 'tab-http-response' }).exists()).to.be.false;
        expect(wrapper.find({ name: 'tab-console-finished-response' }).exists()).to.be.false;
    });

    it('has views tab', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { views: [{ name: 'a', path: 'b', data: [] }] }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(4).text()).to.equal('Views (1)');

        wrapper.tabs(4).find('a').trigger('click');
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
        expect(wrapper.tabs(4).text()).to.equal('Views (0)');
        expect(wrapper.tabs(4).classes()).to.contain('is-disabled');
        expect(wrapperTabViews.exists()).to.be.false;
    });

    it('views tab has number of views only if views are provided', async () => {
        let trackerSource = trackerFactory.create('data', { views: [] });
        delete trackerSource.data.views;
        let tracker = new Tracker(trackerSource);
        let wrapper = mountWithTracker(DashboardDetails, tracker);
        let wrapperTabViews = wrapper.find({ name: 'tab-views' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(4).text()).to.equal('Views');
        expect(wrapper.tabs(4).classes()).to.contain('is-disabled');
        expect(wrapperTabViews.exists()).to.be.false;
    });

    it('has events tab', async () => {
        let tracker = new Tracker(trackerFactory.set('meta', { events_count: 1 }).create('data', { events: [
            { name: 'a', data: {} },
        ]}));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(5).text()).to.equal('Events (1)');

        wrapper.tabs(5).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabEvents = wrapper.find({ name: 'tab-events' });
        expect(wrapperTabEvents.isVisible()).to.be.true;
        expect(wrapperTabEvents.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('events tab is enabled only if any event is present', async () => {
        let tracker = new Tracker(trackerFactory.set('meta', { events_count: 0 }).create('data', { events: [] }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);
        let wrapperTabEvents = wrapper.find({ name: 'tab-events' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(5).text()).to.equal('Events (0)');
        expect(wrapper.tabs(5).classes()).to.contain('is-disabled');
        expect(wrapperTabEvents.exists()).to.be.false;
    });

    it('events tab has number of events only if events are provided', async () => {
        let trackerSource = trackerFactory.set('meta', { events_count: 0 }).create('data', { events: [] });
        delete trackerSource.meta.events_count;
        delete trackerSource.data.events;
        let tracker = new Tracker(trackerSource);
        let wrapper = mountWithTracker(DashboardDetails, tracker);
        let wrapperTabEvents = wrapper.find({ name: 'tab-events' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(5).text()).to.equal('Events');
        expect(wrapper.tabs(5).classes()).to.contain('is-disabled');
        expect(wrapperTabEvents.exists()).to.be.false;
    });

    it('has queries tab', async () => {
        let tracker = new Tracker(trackerFactory.set('meta', { queries_count: 1 }).create('data', { queries: [{
            type: 'query',
            database: 'laravel_profiler_2',
            name: 'mysql_2',
            query: 'select * from `users` where `id` = 2 limit 1',
            sql: 'select * from `users` where `id` = ? limit 1',
            bindings: [2],
            time: 22,
        }]}));
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(6).text()).to.equal('Queries (1)');

        wrapper.tabs(6).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabQueries = wrapper.find({ name: 'tab-queries' });
        expect(wrapperTabQueries.isVisible()).to.be.true;
        expect(wrapperTabQueries.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('queries tab is enabled only if any query is present', async () => {
        let tracker = new Tracker(trackerFactory.set('meta', { queries_count: 0 }).create('data', { queries: [] }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);
        let wrapperTabQueries = wrapper.find({ name: 'tab-queries' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(6).text()).to.equal('Queries (0)');
        expect(wrapper.tabs(6).classes()).to.contain('is-disabled');
        expect(wrapperTabQueries.exists()).to.be.false;
    });

    it('queries tab has number of queries only if queries are provided', async () => {
        let trackerSource = trackerFactory.set('meta', { events_count: 0 }).create('data', { queries: [] });
        delete trackerSource.meta.queries_count;
        delete trackerSource.data.queries;
        let tracker = new Tracker(trackerSource);
        let wrapper = mountWithTracker(DashboardDetails, tracker);
        let wrapperTabQueries = wrapper.find({ name: 'tab-queries' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(6).text()).to.equal('Queries');
        expect(wrapper.tabs(6).classes()).to.contain('is-disabled');
        expect(wrapperTabQueries.exists()).to.be.false;
    });

    it('has auth tab', async () => {
        let tracker = new Tracker(trackerFactory.create());
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(7).text()).to.equal('Auth');

        wrapper.tabs(7).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabAuth = wrapper.find({ name: 'tab-auth' });
        expect(wrapperTabAuth.isVisible()).to.be.true;
        expect(wrapperTabAuth.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('auth tab is enabled only if auth is present', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { auth: null }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);
        let wrapperTabAuth = wrapper.find({ name: 'tab-auth' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(7).text()).to.equal('Auth');
        expect(wrapper.tabs(7).classes()).to.contain('is-disabled');
        expect(wrapperTabAuth.exists()).to.be.false;
    });

    it('auth tab is enabled only if auth is provided', async () => {
        let trackerSource = trackerFactory.create('data', { auth: undefined });
        delete trackerSource.data.auth;
        let tracker = new Tracker(trackerSource);
        let wrapper = mountWithTracker(DashboardDetails, tracker);
        let wrapperTabAuth = wrapper.find({ name: 'tab-auth' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(7).text()).to.equal('Auth');
        expect(wrapper.tabs(7).classes()).to.contain('is-disabled');
        expect(wrapperTabAuth.exists()).to.be.false;
    });

    it('has exception tab', async () => {
        let tracker = new Tracker(trackerFactory.create());
        let wrapper = mountWithTracker(DashboardDetails, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(8).text()).to.equal('Exception');

        wrapper.tabs(8).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabException = wrapper.find({ name: 'tab-exception' });
        expect(wrapperTabException.isVisible()).to.be.true;
        expect(wrapperTabException.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('exception tab is enabled only if exception is present', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { exception: null }));
        let wrapper = mountWithTracker(DashboardDetails, tracker);
        let wrapperTabException = wrapper.find({ name: 'tab-exception' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(8).text()).to.equal('Exception');
        expect(wrapper.tabs(8).classes()).to.contain('is-disabled');
        expect(wrapperTabException.exists()).to.be.false;
    });

    it('exception tab is enabled only if exception is provided', async () => {
        let trackerSource = trackerFactory.create('data', { exception: undefined });
        delete trackerSource.data.exception;
        let tracker = new Tracker(trackerSource);
        let wrapper = mountWithTracker(DashboardDetails, tracker);
        let wrapperTabException = wrapper.find({ name: 'tab-exception' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(8).text()).to.equal('Exception');
        expect(wrapper.tabs(8).classes()).to.contain('is-disabled');
        expect(wrapperTabException.exists()).to.be.false;
    });
});

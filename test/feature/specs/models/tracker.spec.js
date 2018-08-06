import moment from 'moment';
import Path from '@/models/path';
import View from '@/models/view';
import Event from '@/models/event';
import Tracker from '@/models/tracker';
import Binding from '@/models/binding';
import NullRoute from '@/models/null-route';
import HttpRoute from '@/models/http-route';
import Application from '@/models/application';
import NullRequest from '@/models/null-request';
import HttpRequest from '@/models/http-request';
import NullResponse from '@/models/null-response';
import HttpResponse from '@/models/http-response';
import { trackerFactory } from './../test-helper';
import ConsoleStartingRequest from '@/models/console-starting-request';
import ConsoleFinishedRequest from '@/models/console-finished-request';
import ConsoleStartingResponse from '@/models/console-starting-response';
import ConsoleFinishedResponse from '@/models/console-finished-response';

describe('Tracker Model', () => {
    it('has executionAt', () => {
        let tracker = new Tracker(trackerFactory.create('meta', { execution_at: 1234566 }));

        expect(tracker.executionAt).to.equal(moment.unix(1234566).format('HH:mm:ss'));
    });

    it('has id', () => {
        let tracker = new Tracker(trackerFactory.create('meta', { id: 'abc4567890abc4567890abc456789011' }));

        expect(tracker.id).to.equal('abc4567890abc4567890abc456789011');
    });

    it('has laravel version', () => {
        let tracker = new Tracker(trackerFactory.create('meta', { laravel_version: '5.6.1' }));

        expect(tracker.laravelVersion).to.equal('5.6.1');
    });

    it('has php version', () => {
        let tracker = new Tracker(trackerFactory.create('meta', { php_version: '7.1.1' }));

        expect(tracker.phpVersion).to.equal('7.1.1');
    });

    it('has env', () => {
        let tracker = new Tracker(trackerFactory.create('meta', { env: 'production' }));

        expect(tracker.env).to.equal('production');
    });

    it('has running', () => {
        let trackerA = new Tracker(trackerFactory.create('meta', { is_running_in_console: true }));
        let trackerB = new Tracker(trackerFactory.create('meta', { is_running_in_console: false }));

        expect(trackerA.running).to.equal('console');
        expect(trackerB.running).to.equal('web');
    });

    it('has type', () => {
        let trackerA = new Tracker(trackerFactory.create('meta', { type: 'http', ajax: false, json: false }));
        let trackerB = new Tracker(trackerFactory.create('meta', { type: 'http', ajax: true, json: false }));
        let trackerC = new Tracker(trackerFactory.create('meta', { type: 'http', ajax: false, json: true }));
        let trackerD = new Tracker(trackerFactory.create('meta', { type: 'http', ajax: true, json: true }));
        let trackerX = new Tracker(trackerFactory.create('meta', { type: 'command-starting' }));
        let trackerY = new Tracker(trackerFactory.create('meta', { type: 'command-finished' }));
        let trackerZ = new Tracker(trackerFactory.create('meta', { type: null }));

        expect(trackerA.type).to.equal('http');
        expect(trackerA.typeGroup).to.equal('http');
        expect(trackerB.type).to.equal('http');
        expect(trackerB.typeGroup).to.equal('http / ajax');
        expect(trackerC.type).to.equal('http');
        expect(trackerC.typeGroup).to.equal('http / json');
        expect(trackerD.type).to.equal('http');
        expect(trackerD.typeGroup).to.equal('http / ajax / json');
        expect(trackerX.type).to.equal('command');
        expect(trackerX.typeGroup).to.equal('command');
        expect(trackerY.type).to.equal('command');
        expect(trackerY.typeGroup).to.equal('command');
        expect(trackerZ.type).to.equal('---');
        expect(trackerZ.typeGroup).to.equal('---');
    });

    it('has method', () => {
        let trackerA = new Tracker(trackerFactory.create('meta', { method: 'DELETE' }));
        let trackerB = new Tracker(trackerFactory.create('meta', { method: null }));

        expect(trackerA.method).to.equal('DELETE');
        expect(trackerB.method).to.equal('---');
    });

    it('has path', () => {
        let trackerA = new Tracker(trackerFactory.create('meta', { path: '/some-page' }));
        let trackerB = new Tracker(trackerFactory.create('meta', { path: null }));

        expect(trackerA.path).to.equal('/some-page');
        expect(trackerB.path).to.equal('---');
    });

    it('has status', () => {
        let trackerA = new Tracker(trackerFactory.create('meta', { type: 'http', status: 100 }));
        let trackerB = new Tracker(trackerFactory.create('meta', { type: 'http', status: 201 }));
        let trackerC = new Tracker(trackerFactory.create('meta', { type: 'http', status: 302 }));
        let trackerD = new Tracker(trackerFactory.create('meta', { type: 'http', status: 403 }));
        let trackerE = new Tracker(trackerFactory.create('meta', { type: 'http', status: 504 }));
        let trackerF = new Tracker(trackerFactory.create('meta', { type: 'http', status: 605 }));
        let trackerG = new Tracker(trackerFactory.create('meta', { type: 'http', status: null }));
        let trackerW = new Tracker(trackerFactory.create('meta', { type: 'command-starting', status: 0 }));
        let trackerX = new Tracker(trackerFactory.create('meta', { type: 'command-starting', status: null }));
        let trackerY = new Tracker(trackerFactory.create('meta', { type: 'command-finished', status: 201 }));
        let trackerZ = new Tracker(trackerFactory.create('meta', { type: null }));

        expect(trackerA.status).to.equal(100);
        expect(trackerA.statusGroup).to.equal('?xx');
        expect(trackerA.statusColor).to.equal('is-light');
        expect(trackerB.status).to.equal(201);
        expect(trackerB.statusGroup).to.equal('2xx');
        expect(trackerB.statusColor).to.equal('is-success');
        expect(trackerC.status).to.equal(302);
        expect(trackerC.statusGroup).to.equal('3xx');
        expect(trackerC.statusColor).to.equal('is-primary');
        expect(trackerD.status).to.equal(403);
        expect(trackerD.statusGroup).to.equal('4xx');
        expect(trackerD.statusColor).to.equal('is-warning');
        expect(trackerE.status).to.equal(504);
        expect(trackerE.statusGroup).to.equal('5xx');
        expect(trackerE.statusColor).to.equal('is-danger');
        expect(trackerF.status).to.equal(605);
        expect(trackerF.statusGroup).to.equal('?xx');
        expect(trackerF.statusColor).to.equal('is-light');
        expect(trackerG.status).to.equal('---');
        expect(trackerG.statusGroup).to.equal('---');
        expect(trackerG.statusColor).to.equal('is-light');
        expect(trackerW.status).to.equal(0);
        expect(trackerW.statusGroup).to.equal('exitCode');
        expect(trackerW.statusColor).to.equal('is-dark');
        expect(trackerX.status).to.equal('---');
        expect(trackerX.statusGroup).to.equal('---');
        expect(trackerX.statusColor).to.equal('is-light');
        expect(trackerY.status).to.equal(201);
        expect(trackerY.statusGroup).to.equal('exitCode');
        expect(trackerY.statusColor).to.equal('is-dark');
        expect(trackerZ.status).to.equal('---');
        expect(trackerZ.statusGroup).to.equal('---');
        expect(trackerZ.statusColor).to.equal('is-light');
    });

    it('has status text', () => {
        let trackerA = new Tracker(trackerFactory.create('meta', { status_text: 'Not Found' }));
        let trackerB = new Tracker(trackerFactory.create('meta', { status_text: null }));

        expect(trackerA.statusText).to.equal('Not Found');
        expect(trackerA.hasStatusText()).to.be.true;
        expect(trackerB.statusText).to.equal('---');
        expect(trackerB.hasStatusText()).to.be.false;
    });

    it('has application data', () => {
        let tracker = new Tracker(trackerFactory.create('data', { application: {
            locale: 'test-locale',
            routes_are_cached: false,
            configuration_is_cached: false,
            is_down_for_maintenance: false,
            should_skip_middleware: false,
        }}));

        expect(tracker.application).to.be.instanceOf(Application);
        expect(tracker.application.locale).to.equal('test-locale');
        expect(tracker.application.routesAreCached).to.be.false;
        expect(tracker.application.configurationIsCached).to.be.false;
        expect(tracker.application.isDownForMaintenance).to.be.false;
        expect(tracker.application.shouldSkipMiddleware).to.be.false;

        tracker = new Tracker(trackerFactory.create('data', { application: {
            locale: 'test-locale',
            routes_are_cached: true,
            configuration_is_cached: false,
            is_down_for_maintenance: false,
            should_skip_middleware: false,
        }}));

        expect(tracker.application.routesAreCached).to.be.true;
        expect(tracker.application.configurationIsCached).to.be.false;
        expect(tracker.application.isDownForMaintenance).to.be.false;
        expect(tracker.application.shouldSkipMiddleware).to.be.false;

        tracker = new Tracker(trackerFactory.create('data', { application: {
            locale: 'test-locale',
            routes_are_cached: false,
            configuration_is_cached: true,
            is_down_for_maintenance: false,
            should_skip_middleware: false,
        }}));

        expect(tracker.application.routesAreCached).to.be.false;
        expect(tracker.application.configurationIsCached).to.be.true;
        expect(tracker.application.isDownForMaintenance).to.be.false;
        expect(tracker.application.shouldSkipMiddleware).to.be.false;

        tracker = new Tracker(trackerFactory.create('data', { application: {
            locale: 'test-locale',
            routes_are_cached: false,
            configuration_is_cached: false,
            is_down_for_maintenance: true,
            should_skip_middleware: false,
        }}));

        expect(tracker.application.routesAreCached).to.be.false;
        expect(tracker.application.configurationIsCached).to.be.false;
        expect(tracker.application.isDownForMaintenance).to.be.true;
        expect(tracker.application.shouldSkipMiddleware).to.be.false;

        tracker = new Tracker(trackerFactory.create('data', { application: {
            locale: 'test-locale',
            routes_are_cached: false,
            configuration_is_cached: false,
            is_down_for_maintenance: false,
            should_skip_middleware: true,
        }}));

        expect(tracker.application.routesAreCached).to.be.false;
        expect(tracker.application.configurationIsCached).to.be.false;
        expect(tracker.application.isDownForMaintenance).to.be.false;
        expect(tracker.application.shouldSkipMiddleware).to.be.true;
    });

    it('has config', () => {
        let tracker = new Tracker(trackerFactory.create('data', { config: { a: 1, b: 2, c: 3 } }));

        expect(tracker.countConfig()).to.be.equal(3);
        expect(tracker.hasConfig()).to.be.true;
        expect(tracker.config).to.deep.equal({ a: 1, b: 2, c: 3 });
    });

    it('has empty config if config is not delivered', () => {
        let tracker = new Tracker(trackerFactory.create('data', { config: undefined }));

        expect(tracker.config).to.be.an('object');
        expect(tracker.countConfig()).to.be.equal(0);
        expect(tracker.hasConfig()).to.be.false;
    });

    it('has service providers', () => {
        let tracker = new Tracker(trackerFactory.create('data', { service_providers: ['first', 'second', 'one-more'] }));

        expect(tracker.countServiceProviders()).to.be.equal(3);
        expect(tracker.hasServiceProviders()).to.be.true;
        expect(tracker.serviceProviders).to.deep.equal(['first', 'second', 'one-more']);
        expect(tracker.serviceProviders.length).to.be.equal(3);
        expect(tracker.serviceProviders[0]).to.be.a('string');
    });

    it('has empty service providers if service providers are not delivered', () => {
        let tracker = new Tracker(trackerFactory.create('data', { service_providers: undefined }));

        expect(tracker.serviceProviders).to.be.an('array');
        expect(tracker.countServiceProviders()).to.be.equal(0);
        expect(tracker.hasServiceProviders()).to.be.false;
    });

    it('has bindings', () => {
        let tracker = new Tracker(trackerFactory.create('data', { bindings: [{ abstract: 'a', resolved: 'b' }] }));

        expect(tracker.countBindings()).to.be.equal(1);
        expect(tracker.hasBindings()).to.be.true;
        expect(tracker.bindings).to.deep.equal([{ abstract: 'a', resolved: 'b' }]);
        expect(tracker.bindings.length).to.be.equal(1);
        expect(tracker.bindings[0]).to.be.an.instanceOf(Binding);
    });

    it('has empty bindings array if bindings are not delivered', () => {
        let tracker = new Tracker(trackerFactory.create('data', { bindings: undefined }));

        expect(tracker.bindings).to.be.an('array');
        expect(tracker.countBindings()).to.be.equal(0);
        expect(tracker.hasBindings()).to.be.false;
    });

    it('has paths', () => {
        let tracker = new Tracker(trackerFactory.create('data', { paths: [{ name: 'a', path: 'b' }] }));

        expect(tracker.countPaths()).to.be.equal(1);
        expect(tracker.hasPaths()).to.be.true;
        expect(tracker.paths).to.deep.equal([{ name: 'a', path: 'b' }]);
        expect(tracker.paths.length).to.be.equal(1);
        expect(tracker.paths[0]).to.be.an.instanceOf(Path);
    });

    it('has empty paths if paths are not delivered', () => {
        let tracker = new Tracker(trackerFactory.create('data', { paths: undefined }));

        expect(tracker.paths).to.be.an('array');
        expect(tracker.countPaths()).to.be.equal(0);
        expect(tracker.hasPaths()).to.be.false;
    });

    it('has session', () => {
        let tracker = new Tracker(trackerFactory.create('data', { session: { a: 1, b: 2, c: 3 } }));

        expect(tracker.countSession()).to.be.equal(3);
        expect(tracker.hasSession()).to.be.true;
        expect(tracker.session).to.deep.equal({ a: 1, b: 2, c: 3 });
        expect(tracker.isSessionProvided()).to.be.true;
    });

    it('has empty session if session data are not delivered', () => {
        let tracker = new Tracker(trackerFactory.create('data', { session: undefined }));

        expect(tracker.session).to.be.an('object');
        expect(tracker.countSession()).to.be.equal(0);
        expect(tracker.hasSession()).to.be.false;
        expect(tracker.isSessionProvided()).to.be.true;
    });

    it('has not provided session if session data are not provided at all', () => {
        let trackerSource = trackerFactory.create('data', { session: undefined });
        delete trackerSource.data.session;
        let tracker = new Tracker(trackerSource);

        expect(tracker.session).to.be.an('object');
        expect(tracker.countSession()).to.be.equal(0);
        expect(tracker.hasSession()).to.be.false;
        expect(tracker.isSessionProvided()).to.be.false;
    });

    it('has request based on meta type', () => {
        let trackerA = new Tracker(trackerFactory.create('meta', { type: 'http' }));
        let trackerB = new Tracker(trackerFactory.create('meta', { type: 'command-starting' }));
        let trackerC = new Tracker(trackerFactory.create('meta', { type: 'command-finished' }));
        let trackerD = new Tracker(trackerFactory.create('meta', { type: null }));
        let trackerE = new Tracker(trackerFactory.create('meta', { type: 'not-know-type' }));

        expect(trackerA.request).to.be.an.instanceOf(HttpRequest);
        expect(trackerB.request).to.be.an.instanceOf(ConsoleStartingRequest);
        expect(trackerC.request).to.be.an.instanceOf(ConsoleFinishedRequest);
        expect(trackerD.request).to.be.an.instanceOf(NullRequest);
        expect(trackerE.request).to.be.an.instanceOf(NullRequest);
    });

    it('has response based on meta type', () => {
        let trackerA = new Tracker(trackerFactory.create('meta', { type: 'http' }));
        let trackerB = new Tracker(trackerFactory.create('meta', { type: 'command-starting' }));
        let trackerC = new Tracker(trackerFactory.create('meta', { type: 'command-finished' }));
        let trackerD = new Tracker(trackerFactory.create('meta', { type: null }));
        let trackerE = new Tracker(trackerFactory.create('meta', { type: 'not-know-type' }));

        expect(trackerA.response).to.be.an.instanceOf(HttpResponse);
        expect(trackerB.response).to.be.an.instanceOf(ConsoleStartingResponse);
        expect(trackerC.response).to.be.an.instanceOf(ConsoleFinishedResponse);
        expect(trackerD.response).to.be.an.instanceOf(NullResponse);
        expect(trackerE.response).to.be.an.instanceOf(NullResponse);
    });

    it('has route based on meta type', () => {
        let trackerA = new Tracker(trackerFactory.create('meta', { type: 'http' }));
        let trackerB = new Tracker(trackerFactory.set('data', { route: [] }).create('meta', { type: 'http' }));
        let trackerC = new Tracker(trackerFactory.create('meta', { type: 'command-starting' }));
        let trackerD = new Tracker(trackerFactory.create('meta', { type: 'command-finished' }));
        let trackerE = new Tracker(trackerFactory.create('meta', { type: null }));
        let trackerF = new Tracker(trackerFactory.create('meta', { type: 'not-know-type' }));

        expect(trackerA.route).to.be.an.instanceOf(HttpRoute);
        expect(trackerB.route).to.be.an.instanceOf(NullRoute);
        expect(trackerC.route).to.be.an.instanceOf(NullRoute);
        expect(trackerD.route).to.be.an.instanceOf(NullRoute);
        expect(trackerE.route).to.be.an.instanceOf(NullRoute);
        expect(trackerF.route).to.be.an.instanceOf(NullRoute);
    });

    it('has views', () => {
        let tracker = new Tracker(trackerFactory.create('data', { views: [{ name: 'a', path: 'b', data: [] }] }));

        expect(tracker.countViews()).to.be.equal(1);
        expect(tracker.hasViews()).to.be.true;
        expect(tracker.views).to.deep.equal([{ name: 'a', path: 'b', data: [] }]);
        expect(tracker.views.length).to.be.equal(1);
        expect(tracker.views[0]).to.be.an.instanceOf(View);
        expect(tracker.areViewsProvided()).to.be.true;
    });

    it('has empty views if views are not delivered', () => {
        let tracker = new Tracker(trackerFactory.create('data', { views: undefined }));

        expect(tracker.views).to.be.an('array');
        expect(tracker.countViews()).to.be.equal(0);
        expect(tracker.hasViews()).to.be.false;
        expect(tracker.areViewsProvided()).to.be.true;
    });

    it('has not provided views if views are not provided at all', () => {
        let trackerSource = trackerFactory.create('data', { views: undefined });
        delete trackerSource.data.views;
        let tracker = new Tracker(trackerSource);

        expect(tracker.views).to.be.an('array');
        expect(tracker.countViews()).to.be.equal(0);
        expect(tracker.hasViews()).to.be.false;
        expect(tracker.areViewsProvided()).to.be.false;
    });

    it('has events', () => {
        let tracker = new Tracker(trackerFactory.create('data', { events: [{ name: 'a', data: {} }] }));

        expect(tracker.countEvents()).to.be.equal(1);
        expect(tracker.hasEvents()).to.be.true;
        expect(tracker.events).to.deep.equal([{ name: 'a', data: {} }]);
        expect(tracker.events.length).to.be.equal(1);
        expect(tracker.events[0]).to.be.an.instanceOf(Event);
        expect(tracker.areEventsProvided()).to.be.true;
    });

    it('has empty events if events are not delivered', () => {
        let tracker = new Tracker(trackerFactory.create('data', { events: undefined }));

        expect(tracker.events).to.be.an('array');
        expect(tracker.countEvents()).to.be.equal(0);
        expect(tracker.hasEvents()).to.be.false;
        expect(tracker.areEventsProvided()).to.be.true;
    });

    it('has not provided events if events are not provided at all', () => {
        let trackerSource = trackerFactory.create('data', { events: undefined });
        delete trackerSource.data.events;
        let tracker = new Tracker(trackerSource);

        expect(tracker.events).to.be.an('array');
        expect(tracker.countEvents()).to.be.equal(0);
        expect(tracker.hasEvents()).to.be.false;
        expect(tracker.areEventsProvided()).to.be.false;
    });
});

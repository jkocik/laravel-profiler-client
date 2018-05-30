import Path from '@/models/path';
import Tracker from '@/models/tracker';
import Binding from '@/models/binding';
import Application from '@/models/application';
import NullRequest from '@/models/null-request';
import HttpRequest from '@/models/http-request';
import NullResponse from '@/models/null-response';
import HttpResponse from '@/models/http-response';
import ConsoleStartingRequest from '@/models/console-starting-request';
import ConsoleFinishedRequest from '@/models/console-finished-request';
import ConsoleStartingResponse from '@/models/console-starting-response';
import ConsoleFinishedResponse from '@/models/console-finished-response';
import { dummyTrackerData, dummyTrackerDataB } from './../../../fixtures/es6';

describe('Tracker Model', () => {
    it('has executionAt', () => {
        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.executionAt).to.equal('07:56:07');
    });

    it('has id', () => {
        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.id).to.equal(dummyTrackerData.meta.id);
    });

    it('has laravel version', () => {
        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.laravelVersion).to.equal(dummyTrackerData.meta.laravel_version);
    });

    it('has php version', () => {
        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.phpVersion).to.equal(dummyTrackerData.meta.php_version);
    });

    it('has env', () => {
        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.env).to.equal(dummyTrackerData.meta.env);
    });

    it('has running', () => {
        let trackerA = new Tracker(Object.assign({}, dummyTrackerData, { meta: { is_running_in_console: true } }));
        let trackerB = new Tracker(Object.assign({}, dummyTrackerData, { meta: { is_running_in_console: false } }));

        expect(trackerA.running).to.equal('console');
        expect(trackerB.running).to.equal('web');
    });

    it('has type', () => {
        let trackerA = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'http', ajax: false, json: false } }));
        let trackerB = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'http', ajax: true, json: false } }));
        let trackerC = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'http', ajax: false, json: true } }));
        let trackerD = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'http', ajax: true, json: true } }));
        let trackerX = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'command-starting' } }));
        let trackerY = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'command-finished' } }));
        let trackerZ = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: null } }));

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
        let trackerA = new Tracker(dummyTrackerData);
        let trackerB = new Tracker(Object.assign({}, dummyTrackerData, { meta: { method: null } }));

        expect(trackerA.method).to.equal(dummyTrackerData.meta.method);
        expect(trackerB.method).to.equal('---');
    });

    it('has path', () => {
        let trackerA = new Tracker(dummyTrackerData);
        let trackerB = new Tracker(Object.assign({}, dummyTrackerData, { meta: { path: null } }));

        expect(trackerA.path).to.equal(dummyTrackerData.meta.path);
        expect(trackerB.path).to.equal('---');
    });

    it('has status', () => {
        let trackerA = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'http', status: 100 } }));
        let trackerB = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'http', status: 201 } }));
        let trackerC = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'http', status: 302 } }));
        let trackerD = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'http', status: 403 } }));
        let trackerE = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'http', status: 504 } }));
        let trackerF = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'http', status: 605 } }));
        let trackerG = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'http', status: null } }));
        let trackerW = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'command-starting', status: 0 } }));
        let trackerX = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'command-starting', status: null } }));
        let trackerY = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'command-finished', status: 201 } }));
        let trackerZ = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: null } }));

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

    it('has application data', () => {
        let trackerA = new Tracker(dummyTrackerData);
        let trackerB = new Tracker(dummyTrackerDataB);

        expect(trackerA.application).to.be.instanceOf(Application);
        expect(trackerA.application.locale).to.equal(dummyTrackerData.data.application.locale);
        expect(trackerA.application.routesAreCached).to.equal(dummyTrackerData.data.application.routes_are_cached);
        expect(trackerA.application.configurationIsCached).to.equal(dummyTrackerData.data.application.configuration_is_cached);
        expect(trackerA.application.isDownForMaintenance).to.equal(dummyTrackerData.data.application.is_down_for_maintenance);
        expect(trackerA.application.shouldSkipMiddleware).to.equal(dummyTrackerData.data.application.should_skip_middleware);
        expect(trackerB.application).to.be.instanceOf(Application);
        expect(trackerB.application.locale).to.equal(dummyTrackerDataB.data.application.locale);
        expect(trackerB.application.routesAreCached).to.equal(dummyTrackerDataB.data.application.routes_are_cached);
        expect(trackerB.application.configurationIsCached).to.equal(dummyTrackerDataB.data.application.configuration_is_cached);
        expect(trackerB.application.isDownForMaintenance).to.equal(dummyTrackerDataB.data.application.is_down_for_maintenance);
        expect(trackerB.application.shouldSkipMiddleware).to.equal(dummyTrackerDataB.data.application.should_skip_middleware);
    });

    it('has config', () => {
        expect(Object.keys(dummyTrackerData.data.config).length).to.be.equal(2);

        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.countConfig()).to.be.equal(2);
        expect(tracker.hasConfig()).to.be.true;
        expect(tracker.config).to.deep.equal(dummyTrackerData.data.config);
    });

    it('has empty config if config is not delivered', () => {
        let data = Object.assign({}, dummyTrackerData.data, { config: undefined });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));

        expect(data.config).to.be.undefined;
        expect(tracker.config).to.be.an('object');
        expect(tracker.countConfig()).to.be.equal(0);
        expect(tracker.hasConfig()).to.be.false;
    });

    it('has service providers', () => {
        expect(dummyTrackerData.data.serviceProviders.length).to.be.equal(2);

        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.countServiceProviders()).to.be.equal(2);
        expect(tracker.hasServiceProviders()).to.be.true;
        expect(tracker.serviceProviders).to.deep.equal(dummyTrackerData.data.serviceProviders);
        expect(tracker.serviceProviders.length).to.be.equal(dummyTrackerData.data.serviceProviders.length);
        expect(tracker.serviceProviders[0]).to.be.a('string');
    });

    it('has empty service providers if service providers are not delivered', () => {
        let data = Object.assign({}, dummyTrackerData.data, { serviceProviders: undefined });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));

        expect(data.serviceProviders).to.be.undefined;
        expect(tracker.serviceProviders).to.be.an('array');
        expect(tracker.countServiceProviders()).to.be.equal(0);
        expect(tracker.hasServiceProviders()).to.be.false;
    });

    it('has bindings', () => {
        expect(dummyTrackerData.data.bindings.length).to.be.equal(2);

        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.countBindings()).to.be.equal(2);
        expect(tracker.hasBindings()).to.be.true;
        expect(tracker.bindings).to.deep.equal(dummyTrackerData.data.bindings);
        expect(tracker.bindings.length).to.be.equal(dummyTrackerData.data.bindings.length);
        expect(tracker.bindings[0]).to.be.an.instanceOf(Binding);
    });

    it('has empty bindings array if bindings are not delivered', () => {
        let data = Object.assign({}, dummyTrackerData.data, { bindings: undefined });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));

        expect(data.bindings).to.be.undefined;
        expect(tracker.bindings).to.be.an('array');
        expect(tracker.countBindings()).to.be.equal(0);
        expect(tracker.hasBindings()).to.be.false;
    });

    it('has paths', () => {
        expect(dummyTrackerData.data.paths.length).to.be.equal(2);

        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.countPaths()).to.be.equal(2);
        expect(tracker.hasPaths()).to.be.true;
        expect(tracker.paths).to.deep.equal(dummyTrackerData.data.paths);
        expect(tracker.paths.length).to.be.equal(dummyTrackerData.data.paths.length);
        expect(tracker.paths[0]).to.be.an.instanceOf(Path);
    });

    it('has empty paths if paths are not delivered', () => {
        let data = Object.assign({}, dummyTrackerData.data, { paths: undefined });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));

        expect(data.paths).to.be.undefined;
        expect(tracker.paths).to.be.an('array');
        expect(tracker.countPaths()).to.be.equal(0);
        expect(tracker.hasPaths()).to.be.false;
    });

    it('has session', () => {
        expect(Object.keys(dummyTrackerData.data.session).length).to.be.equal(6);

        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.countSession()).to.be.equal(6);
        expect(tracker.hasSession()).to.be.true;
        expect(tracker.session).to.deep.equal(dummyTrackerData.data.session);
    });

    it('has empty session if session data are not delivered', () => {
        let data = Object.assign({}, dummyTrackerData.data, { session: undefined });
        let tracker = new Tracker(Object.assign({}, dummyTrackerData, { data }));

        expect(data.session).to.be.undefined;
        expect(tracker.session).to.be.an('object');
        expect(tracker.countSession()).to.be.equal(0);
        expect(tracker.hasSession()).to.be.false;
    });

    it('has request based on meta type', () => {
        let trackerA = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'http' } }));
        let trackerB = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'command-starting' } }));
        let trackerC = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'command-finished' } }));
        let trackerD = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: null } }));
        let trackerE = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'not-know-type' } }));

        expect(trackerA.request).to.be.an.instanceOf(HttpRequest);
        expect(trackerB.request).to.be.an.instanceOf(ConsoleStartingRequest);
        expect(trackerC.request).to.be.an.instanceOf(ConsoleFinishedRequest);
        expect(trackerD.request).to.be.an.instanceOf(NullRequest);
        expect(trackerE.request).to.be.an.instanceOf(NullRequest);
    });

    it('has response based on meta type', () => {
        let trackerA = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'http' } }));
        let trackerB = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'command-starting' } }));
        let trackerC = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'command-finished' } }));
        let trackerD = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: null } }));
        let trackerE = new Tracker(Object.assign({}, dummyTrackerData, { meta: { type: 'not-know-type' } }));

        expect(trackerA.response).to.be.an.instanceOf(HttpResponse);
        expect(trackerB.response).to.be.an.instanceOf(ConsoleStartingResponse);
        expect(trackerC.response).to.be.an.instanceOf(ConsoleFinishedResponse);
        expect(trackerD.response).to.be.an.instanceOf(NullResponse);
        expect(trackerE.response).to.be.an.instanceOf(NullResponse);
    });
});

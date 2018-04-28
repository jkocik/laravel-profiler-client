import Tracker from '@/models/tracker';
import Binding from '@/models/binding';
import { dummyTrackerData, dummyTrackerDataB } from './../../../fixtures/es6';

describe('Tracker Model', () => {
    it('has required executionTimeAt', () => {
        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.executionTimeAt).to.equal('07:56:07');
    });

    it('has required id', () => {
        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.id).to.equal(dummyTrackerData.meta.id);
    });

    it('has required version', () => {
        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.version).to.equal(dummyTrackerData.meta.version);
    });

    it('has required env', () => {
        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.env).to.equal(dummyTrackerData.meta.env);
    });

    it('has required running', () => {
        let trackerA = new Tracker(Object.assign({}, dummyTrackerData, { meta: { is_running_in_console: true } }));
        let trackerB = new Tracker(Object.assign({}, dummyTrackerData, { meta: { is_running_in_console: false } }));

        expect(trackerA.running).to.equal('console');
        expect(trackerB.running).to.equal('web');
    });

    it('has required method', () => {
        let trackerA = new Tracker(dummyTrackerData);
        let trackerB = new Tracker(Object.assign({}, dummyTrackerData, { meta: { method: null } }));

        expect(trackerA.method).to.equal(dummyTrackerData.meta.method);
        expect(trackerB.method).to.equal('x');
    });

    it('has required http', () => {
        let trackerA = new Tracker(Object.assign({}, dummyTrackerData, { meta: { is_ajax: true } }));
        let trackerB = new Tracker(Object.assign({}, dummyTrackerData, { meta: { is_ajax: false } }));
        let trackerC = new Tracker(Object.assign({}, dummyTrackerData, { meta: { is_ajax: null } }));

        expect(trackerA.http).to.equal('ajax');
        expect(trackerB.http).to.equal('regular');
        expect(trackerC.http).to.equal('x');
    });

    it('has required status', () => {
        let trackerA = new Tracker(Object.assign({}, dummyTrackerData, { meta: { status: 100 } }));
        let trackerB = new Tracker(Object.assign({}, dummyTrackerData, { meta: { status: 201 } }));
        let trackerC = new Tracker(Object.assign({}, dummyTrackerData, { meta: { status: 302 } }));
        let trackerD = new Tracker(Object.assign({}, dummyTrackerData, { meta: { status: 403 } }));
        let trackerE = new Tracker(Object.assign({}, dummyTrackerData, { meta: { status: 504 } }));
        let trackerF = new Tracker(Object.assign({}, dummyTrackerData, { meta: { status: 605 } }));
        let trackerG = new Tracker(Object.assign({}, dummyTrackerData, { meta: { status: null } }));

        expect(trackerA.status).to.equal(100);
        expect(trackerA.statusGroup).to.equal('?xx');
        expect(trackerA.statusColor).to.equal('is-light');
        expect(trackerB.status).to.equal(201);
        expect(trackerB.statusGroup).to.equal('2xx');
        expect(trackerB.statusColor).to.equal('is-success');
        expect(trackerC.status).to.equal(302);
        expect(trackerC.statusGroup).to.equal('3xx');
        expect(trackerC.statusColor).to.equal('is-dark');
        expect(trackerD.status).to.equal(403);
        expect(trackerD.statusGroup).to.equal('4xx');
        expect(trackerD.statusColor).to.equal('is-warning');
        expect(trackerE.status).to.equal(504);
        expect(trackerE.statusGroup).to.equal('5xx');
        expect(trackerE.statusColor).to.equal('is-danger');
        expect(trackerF.status).to.equal(605);
        expect(trackerF.statusGroup).to.equal('?xx');
        expect(trackerF.statusColor).to.equal('is-light');
        expect(trackerG.status).to.equal('x');
        expect(trackerG.statusGroup).to.equal('x');
        expect(trackerG.statusColor).to.equal('is-light');
    });

    it('has required path', () => {
        let trackerA = new Tracker(dummyTrackerData);
        let trackerB = new Tracker(Object.assign({}, dummyTrackerData, { meta: { path: null } }));

        expect(trackerA.path).to.equal(dummyTrackerData.meta.path);
        expect(trackerB.path).to.equal('x');
    });

    it('has bindings', () => {
        expect(dummyTrackerData.data.bindings.length).to.be.equal(2);

        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.bindings.length).to.be.equal(2);
        expect(tracker.bindings).to.deep.equal(dummyTrackerData.data.bindings);
        expect(tracker.bindings.length).to.be.equal(dummyTrackerData.data.bindings.length);
        expect(tracker.bindings[0]).to.be.an.instanceOf(Binding);
    });

    it('has empty bindings array if bindings are not delivered', () => {
        expect(dummyTrackerDataB.data.bindings).to.be.undefined;

        let tracker = new Tracker(dummyTrackerDataB);

        expect(tracker.bindings.length).to.be.equal(0);
    });
});

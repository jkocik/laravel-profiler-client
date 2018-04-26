import Tracker from '@/models/tracker';
import Binding from '@/models/binding';
import { dummyTrackerData, dummyTrackerDataB } from './../../../fixtures/es6';

describe('Tracker Model', () => {
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
        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.method).to.equal(dummyTrackerData.meta.method);
    });

    it('has required http', () => {
        let trackerA = new Tracker(Object.assign({}, dummyTrackerData, { meta: { is_ajax: true } }));
        let trackerB = new Tracker(Object.assign({}, dummyTrackerData, { meta: { is_ajax: false } }));

        expect(trackerA.http).to.equal('ajax');
        expect(trackerB.http).to.equal('regular');
    });

    it('has required status', () => {
        let trackerA = new Tracker(Object.assign({}, dummyTrackerData, { meta: { status: 100 } }));
        let trackerB = new Tracker(Object.assign({}, dummyTrackerData, { meta: { status: 201 } }));
        let trackerC = new Tracker(Object.assign({}, dummyTrackerData, { meta: { status: 302 } }));
        let trackerD = new Tracker(Object.assign({}, dummyTrackerData, { meta: { status: 403 } }));
        let trackerE = new Tracker(Object.assign({}, dummyTrackerData, { meta: { status: 504 } }));
        let trackerF = new Tracker(Object.assign({}, dummyTrackerData, { meta: { status: 605 } }));

        expect(trackerA.status).to.equal(100);
        expect(trackerB.status).to.equal(201);
        expect(trackerC.status).to.equal(302);
        expect(trackerD.status).to.equal(403);
        expect(trackerE.status).to.equal(504);
        expect(trackerF.status).to.equal(605);
        expect(trackerA.statusGroup).to.equal('?xx');
        expect(trackerB.statusGroup).to.equal('2xx');
        expect(trackerC.statusGroup).to.equal('3xx');
        expect(trackerD.statusGroup).to.equal('4xx');
        expect(trackerE.statusGroup).to.equal('5xx');
        expect(trackerF.statusGroup).to.equal('?xx');
    });

    it('has required path', () => {
        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.path).to.equal(dummyTrackerData.meta.path);
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

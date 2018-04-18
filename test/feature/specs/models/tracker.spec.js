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

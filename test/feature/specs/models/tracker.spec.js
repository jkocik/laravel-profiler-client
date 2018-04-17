import Tracker from '@/models/tracker';
import { dummyTrackerData } from './../../fixtures/trackers';

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
});

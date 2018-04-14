import Tracker from '@/models/tracker';
import { dummyTrackerData } from './../../fixtures/trackers';

describe('Tracker Model', () => {
    it('has required id', () => {
        dummyTrackerData.meta.id = '123';

        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.id).to.equal('123');
    });

    it('has required version', () => {
        dummyTrackerData.meta.version = '1.2.3';

        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.version).to.equal('1.2.3');
    });

    it('has required env', () => {
        dummyTrackerData.meta.env = 'some-env';

        let tracker = new Tracker(dummyTrackerData);

        expect(tracker.env).to.equal('some-env');
    });
});

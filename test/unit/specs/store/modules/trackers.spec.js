import trackers from '@/store/modules/trackers';
import { dummyTracker } from './../../../fixtures/trackers';

describe('Trackers Store Module', () => {
    it('is namespaced', () => {
        expect(trackers.namespaced).to.be.true;
    });

    it('has state', () => {
        expect(trackers.state).to.have.property('all');
    });

    it('returns all trackers', () => {
        let state = {
            all: [
                dummyTracker,
                dummyTracker,
            ],
        };

        let all = trackers.getters.all(state);

        expect(all).to.deep.equal([
            dummyTracker,
            dummyTracker,
        ]);
    });

    it('stores tracker', () => {
        let state = { all: [] };

        trackers.mutations.store(state, dummyTracker);

        expect(state).to.deep.equal({ all: [dummyTracker] });
    });
});

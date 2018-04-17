import { trackersFactory } from '@/store/modules/trackers';
import { dummyTracker, dummyTrackerB } from './../../../../fixtures/es6';

describe('Trackers Store Module', () => {
    let trackers;

    beforeEach(() => {
        trackers = trackersFactory();
    });

    it('is namespaced', () => {
        expect(trackers.namespaced).to.be.true;
    });

    it('has state', () => {
        expect(trackers.state).to.have.property('all');
    });

    it('state is new instance every time new instance of module is created', () => {
        let trackersA = trackersFactory();
        let trackersB = trackersFactory();

        trackersA.state.all.push({});

        expect(trackersA.state.all).to.have.lengthOf(1);
        expect(trackersB.state.all).to.have.lengthOf(0);
    });

    it('returns all trackers', () => {
        let state = { all: [
            dummyTracker,
            dummyTrackerB,
        ]};

        let all = trackers.getters.all(state);

        expect(all).to.deep.equal([
            dummyTracker,
            dummyTrackerB,
        ]);
    });

    it('stores tracker', () => {
        let state = { all: [] };

        trackers.mutations.store(state, dummyTracker);

        expect(state).to.deep.equal({ all: [dummyTracker] });
    });
});

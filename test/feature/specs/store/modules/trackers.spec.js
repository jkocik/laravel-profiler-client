import { filterService } from '@/services/filter.service';
import { trackersFactory } from '@/store/modules/trackers';
import { dummyTracker, dummyTrackerB } from './../../../../fixtures/es6';

describe('Trackers Store Module', () => {
    let trackers;
    let state;

    beforeEach(() => {
        trackers = trackersFactory();
        state = Object.assign({}, trackers.state);
    });

    it('is namespaced', () => {
        expect(trackers.namespaced).to.be.true;
    });

    it('state is new instance every time new instance of module is created', () => {
        let trackersA = trackersFactory();
        let trackersB = trackersFactory();

        trackersA.state.all.push({});

        expect(trackersA.state.all).to.have.lengthOf(1);
        expect(trackersB.state.all).to.have.lengthOf(0);
    });

    it('stores tracker', () => {
        trackers.mutations.store(state, dummyTracker);

        expect(state.all).to.deep.equal([ dummyTracker ]);
    });

    it('updates envs that should be used to filter trackers', () => {
        trackers.mutations.updateFilterEnv(state, [
            'env-a',
            'env-b',
        ]);

        expect(state.filter.env).to.deep.equal([
            'env-a',
            'env-b',
        ]);
    });

    it('returns filtered trackers', () => {
        let spy = sinon.spy(filterService, 'filter');

        state.all = [ dummyTracker ];
        state.filter = { 'any': [] };

        trackers.getters.filtered(state);

        expect(spy.lastCall).to.be.instanceOf(Object);
        expect(spy.lastCall.calledWith(state.all, state.filter)).to.be.true;
    });

    it('returns all envs in ascending order', () => {
        trackers.mutations.store(state, Object.assign({}, dummyTracker, { env: 'b' }));
        trackers.mutations.store(state, Object.assign({}, dummyTracker, { env: 'b' }));
        trackers.mutations.store(state, Object.assign({}, dummyTracker, { env: 'c' }));
        trackers.mutations.store(state, Object.assign({}, dummyTracker, { env: 'a' }));

        let envs = trackers.getters.allEnvs(state);

        expect(envs).to.deep.equal([
            'a',
            'b',
            'c',
        ]);
    });

    it('returns filter with enabled envs', () => {
        trackers.mutations.store(state, dummyTracker);
        trackers.mutations.store(state, dummyTracker);
        trackers.mutations.store(state, dummyTrackerB);

        expect(state.filter.env).to.be.instanceOf(Array);
        expect(state.filter.env).to.deep.equal([
            dummyTracker.env,
            dummyTrackerB.env,
        ]);
    });

    it('new enabled env can be added to filter only if does not exist in all envs', () => {
        trackers.mutations.store(state, dummyTracker);
        state.filter.env = [];
        trackers.mutations.store(state, dummyTracker);

        expect(state.filter.env).to.deep.equal([]);

        trackers.mutations.store(state, dummyTrackerB);

        expect(state.filter.env).to.deep.equal([
            dummyTrackerB.env,
        ]);

        trackers.mutations.store(state, dummyTracker);
        trackers.mutations.store(state, dummyTrackerB);

        expect(state.filter.env).to.deep.equal([
            dummyTrackerB.env,
        ]);
    });
});

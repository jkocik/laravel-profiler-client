import { trackersFactory } from '@/store/modules/trackers';
import { filterService } from '@/services/filter.store.service';
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

    it('updates filter that should be used to filter trackers', () => {
        trackers.mutations.updateFilter(state, { env: [
            'env-a',
            'env-b',
        ]});

        expect(state.filter.env).to.deep.equal([
            'env-a',
            'env-b',
        ]);
    });

    it('returns filtered trackers', () => {
        let spy = sinon.spy(filterService, 'filter');

        state.all = [ dummyTracker ];
        state.allRunnings = [ 'a' ];
        state.allEnvs = [ 'b' ];
        state.allHttp = [ 'c' ];
        state.allMethods = [ 'd' ];

        trackers.getters.filtered(state);

        expect(spy.lastCall).to.be.instanceOf(Object);
        expect(spy.lastCall.calledWith(state.all, state.filter, {
            running: [ 'a' ],
            env: [ 'b' ],
            http: [ 'c' ],
            method: [ 'd' ],
        })).to.be.true;
    });

    it('returns filter with enabled running', () => {
        trackers.mutations.store(state, dummyTracker);
        trackers.mutations.store(state, dummyTracker);
        trackers.mutations.store(state, dummyTrackerB);

        expect(state.filter.running).to.be.instanceOf(Array);
        expect(state.filter.running).to.deep.equal([
            dummyTracker.running,
            dummyTrackerB.running,
        ]);
    });

    it('new enabled running can be added to filter only if does not exist in all runnings', () => {
        trackers.mutations.store(state, dummyTracker);
        state.filter.running = [];
        trackers.mutations.store(state, dummyTracker);

        expect(state.filter.running).to.deep.equal([]);

        trackers.mutations.store(state, dummyTrackerB);

        expect(state.filter.running).to.deep.equal([
            dummyTrackerB.running,
        ]);

        trackers.mutations.store(state, dummyTracker);
        trackers.mutations.store(state, dummyTrackerB);

        expect(state.filter.running).to.deep.equal([
            dummyTrackerB.running,
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

    it('returns filter with enabled http', () => {
        trackers.mutations.store(state, dummyTracker);
        trackers.mutations.store(state, dummyTracker);
        trackers.mutations.store(state, dummyTrackerB);

        expect(state.filter.http).to.be.instanceOf(Array);
        expect(state.filter.http).to.deep.equal([
            dummyTracker.http,
            dummyTrackerB.http,
        ]);
    });

    it('new enabled http can be added to filter only if does not exist in all http', () => {
        trackers.mutations.store(state, dummyTracker);
        state.filter.http = [];
        trackers.mutations.store(state, dummyTracker);

        expect(state.filter.http).to.deep.equal([]);

        trackers.mutations.store(state, dummyTrackerB);

        expect(state.filter.http).to.deep.equal([
            dummyTrackerB.http,
        ]);

        trackers.mutations.store(state, dummyTracker);
        trackers.mutations.store(state, dummyTrackerB);

        expect(state.filter.http).to.deep.equal([
            dummyTrackerB.http,
        ]);
    });

    it('returns filter with enabled methods', () => {
        trackers.mutations.store(state, dummyTracker);
        trackers.mutations.store(state, dummyTracker);
        trackers.mutations.store(state, dummyTrackerB);

        expect(state.filter.method).to.be.instanceOf(Array);
        expect(state.filter.method).to.deep.equal([
            dummyTracker.method,
            dummyTrackerB.method,
        ]);
    });

    it('new enabled method can be added to filter only if does not exist in all methods', () => {
        trackers.mutations.store(state, dummyTracker);
        state.filter.method = [];
        trackers.mutations.store(state, dummyTracker);

        expect(state.filter.method).to.deep.equal([]);

        trackers.mutations.store(state, dummyTrackerB);

        expect(state.filter.method).to.deep.equal([
            dummyTrackerB.method,
        ]);

        trackers.mutations.store(state, dummyTracker);
        trackers.mutations.store(state, dummyTrackerB);

        expect(state.filter.method).to.deep.equal([
            dummyTrackerB.method,
        ]);
    });
});

import Tracker from '@/models/tracker';
import { trackerFactory } from './../../test-helper';
import { trackersFactory } from '@/store/modules/trackers';
import { filterService } from '@/services/filter.store.service';

describe('Trackers Store Module', () => {
    let trackers;
    let state;
    let trackerA;
    let trackerB;

    beforeEach(() => {
        trackers = trackersFactory();
        state = Object.assign({}, trackers.state);

        trackerA = new Tracker(
            trackerFactory
                .set('meta', { id: 123 })
                .set('meta', { is_running_in_console: true })
                .set('meta', { env: 'local' })
                .set('meta', { type: 'http' })
                .set('meta', { status: 200 })
                .set('meta', { method: 'PUT' })
                .create()
        );

        trackerB = new Tracker(
            trackerFactory
                .set('meta', { id: 456 })
                .set('meta', { is_running_in_console: false })
                .set('meta', { env: 'production' })
                .set('meta', { type: 'command-finished' })
                .set('meta', { status: 0 })
                .set('meta', { method: '---' })
                .create()
        );
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
        trackers.mutations.store(state, trackerA);

        expect(state.all).to.deep.equal([ trackerA ]);
    });

    it('stores tracker only if is type of Tracker', () => {
        let trackerCopyWithoutType = Object.assign({}, trackerA);
        expect(trackerA).to.be.an.instanceof(Tracker);
        expect(trackerCopyWithoutType).to.not.be.an.instanceof(Tracker);

        let store = () => trackers.mutations.store(state, trackerCopyWithoutType);

        expect(store).to.throw(TypeError);
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

        state.all = [ trackerA ];
        state.allRunnings = [ 'a' ];
        state.allEnvs = [ 'b' ];
        state.allTypeGroups = [ 'c' ];
        state.allStatusGroups = [ 'd' ];
        state.allMethods = [ 'e' ];

        trackers.getters.filtered(state);

        expect(spy.lastCall).to.be.instanceOf(Object);
        expect(spy.lastCall.calledWith(state.all, state.filter, {
            running: [ 'a' ],
            env: [ 'b' ],
            typeGroup: [ 'c' ],
            statusGroup: [ 'd' ],
            method: [ 'e' ],
        })).to.be.true;

        filterService.filter.restore();
    });

    it('returns filter with enabled running', () => {
        trackers.mutations.store(state, trackerA);
        trackers.mutations.store(state, trackerA);
        trackers.mutations.store(state, trackerB);

        expect(state.filter.running).to.be.instanceOf(Array);
        expect(state.filter.running).to.deep.equal([
            trackerA.running,
            trackerB.running,
        ]);
    });

    it('new enabled running can be added to filter only if does not exist in all runnings', () => {
        trackers.mutations.store(state, trackerA);
        state.filter.running = [];
        trackers.mutations.store(state, trackerA);

        expect(state.filter.running).to.deep.equal([]);

        trackers.mutations.store(state, trackerB);

        expect(state.filter.running).to.deep.equal([
            trackerB.running,
        ]);

        trackers.mutations.store(state, trackerA);
        trackers.mutations.store(state, trackerB);

        expect(state.filter.running).to.deep.equal([
            trackerB.running,
        ]);
    });

    it('returns filter with enabled envs', () => {
        trackers.mutations.store(state, trackerA);
        trackers.mutations.store(state, trackerA);
        trackers.mutations.store(state, trackerB);

        expect(state.filter.env).to.be.instanceOf(Array);
        expect(state.filter.env).to.deep.equal([
            trackerA.env,
            trackerB.env,
        ]);
    });

    it('new enabled env can be added to filter only if does not exist in all envs', () => {
        trackers.mutations.store(state, trackerA);
        state.filter.env = [];
        trackers.mutations.store(state, trackerA);

        expect(state.filter.env).to.deep.equal([]);

        trackers.mutations.store(state, trackerB);

        expect(state.filter.env).to.deep.equal([
            trackerB.env,
        ]);

        trackers.mutations.store(state, trackerA);
        trackers.mutations.store(state, trackerB);

        expect(state.filter.env).to.deep.equal([
            trackerB.env,
        ]);
    });

    it('returns filter with enabled typeGroup', () => {
        trackers.mutations.store(state, trackerA);
        trackers.mutations.store(state, trackerA);
        trackers.mutations.store(state, trackerB);

        expect(state.filter.typeGroup).to.be.instanceOf(Array);
        expect(state.filter.typeGroup).to.deep.equal([
            trackerA.typeGroup,
            trackerB.typeGroup,
        ]);
    });

    it('new enabled typeGroup can be added to filter only if does not exist in all typeGroups', () => {
        trackers.mutations.store(state, trackerA);
        state.filter.typeGroup = [];
        trackers.mutations.store(state, trackerA);

        expect(state.filter.typeGroup).to.deep.equal([]);

        trackers.mutations.store(state, trackerB);

        expect(state.filter.typeGroup).to.deep.equal([
            trackerB.typeGroup,
        ]);

        trackers.mutations.store(state, trackerA);
        trackers.mutations.store(state, trackerB);

        expect(state.filter.typeGroup).to.deep.equal([
            trackerB.typeGroup,
        ]);
    });

    it('returns filter with enabled statusGroups', () => {
        trackers.mutations.store(state, trackerA);
        trackers.mutations.store(state, trackerA);
        trackers.mutations.store(state, trackerB);

        expect(state.filter.statusGroup).to.be.instanceOf(Array);
        expect(state.filter.statusGroup).to.deep.equal([
            trackerA.statusGroup,
            trackerB.statusGroup,
        ]);
    });

    it('new enabled statusGroup can be added to filter only if does not exist in all statusGroups', () => {
        trackers.mutations.store(state, trackerA);
        state.filter.statusGroup = [];
        trackers.mutations.store(state, trackerA);

        expect(state.filter.statusGroup).to.deep.equal([]);

        trackers.mutations.store(state, trackerB);

        expect(state.filter.statusGroup).to.deep.equal([
            trackerB.statusGroup,
        ]);

        trackers.mutations.store(state, trackerA);
        trackers.mutations.store(state, trackerB);

        expect(state.filter.statusGroup).to.deep.equal([
            trackerB.statusGroup,
        ]);
    });

    it('returns filter with enabled methods', () => {
        trackers.mutations.store(state, trackerA);
        trackers.mutations.store(state, trackerA);
        trackers.mutations.store(state, trackerB);

        expect(state.filter.method).to.be.instanceOf(Array);
        expect(state.filter.method).to.deep.equal([
            trackerA.method,
            trackerB.method,
        ]);
    });

    it('new enabled method can be added to filter only if does not exist in all methods', () => {
        trackers.mutations.store(state, trackerA);
        state.filter.method = [];
        trackers.mutations.store(state, trackerA);

        expect(state.filter.method).to.deep.equal([]);

        trackers.mutations.store(state, trackerB);

        expect(state.filter.method).to.deep.equal([
            trackerB.method,
        ]);

        trackers.mutations.store(state, trackerA);
        trackers.mutations.store(state, trackerB);

        expect(state.filter.method).to.deep.equal([
            trackerB.method,
        ]);
    });
});

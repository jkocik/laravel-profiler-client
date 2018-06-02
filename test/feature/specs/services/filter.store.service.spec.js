import Tracker from '@/models/tracker';
import { trackerFactory } from './../test-helper';
import helperService from '@/services/helper.service';
import { filterService } from '@/services/filter.store.service';

describe('Filter Store Service', () => {
    let trackerA;
    let trackerB;
    let trackerBDiffEnv;
    let trackerBDiffMethod;
    let data;

    beforeEach(() => {
        trackerA = new Tracker(
            trackerFactory
                .set('meta', { id: '123' })
                .set('meta', { env: 'local' })
                .set('meta', { method: 'GET' })
                .create()
        );
        trackerB = new Tracker(
            trackerFactory
                .set('meta', { id: '456' })
                .set('meta', { env: 'testing' })
                .set('meta', { method: 'POST' })
                .create()
        );
        trackerBDiffEnv = new Tracker(
            trackerFactory
                .set('meta', { id: '789' })
                .set('meta', { env: 'production' })
                .set('meta', { method: 'POST' })
                .create()
        );
        trackerBDiffMethod = new Tracker(
            trackerFactory
                .set('meta', { id: '001' })
                .set('meta', { env: 'testing' })
                .set('meta', { method: 'PUT' })
                .create()
        );

        data = [
            trackerA,
            trackerB,
            trackerB,
            trackerBDiffEnv,
            trackerBDiffMethod,
        ];
    });

    it('returns filtered data', () => {
        let filterBy = {
            env: [
                trackerA.env,
                trackerB.env,
                trackerBDiffEnv.env,
            ],
        };

        expect(filterService.filter(data, filterBy, { env: [] })).to.deep.equal([
            trackerA,
            trackerB,
            trackerB,
            trackerBDiffEnv,
            trackerBDiffMethod,
        ]);

        filterBy.env.splice(1, 1);
        expect(filterBy.env).to.deep.equal(['local', 'production']);
        expect(filterService.filter(data, filterBy, { env: [] })).to.deep.equal([
            trackerA,
            trackerBDiffEnv,
        ]);
    });

    it('returns data filtered by many params', () => {
        let filterBy = {
            env: [
                trackerA.env,
                trackerB.env,
                trackerBDiffEnv.env,
            ],
            method: [
                trackerA.method,
                trackerB.method,
                trackerBDiffMethod.method,
            ],
        };

        expect(filterService.filter(data, filterBy, { env: [], method: [] })).to.deep.equal([
            trackerA,
            trackerB,
            trackerB,
            trackerBDiffEnv,
            trackerBDiffMethod,
        ]);
    });

    it('exclude data not matching filter after one filter param is not present', () => {
        let filterBy = {
            env: [
                trackerA.env,
                trackerBDiffEnv.env,
            ],
            method: [
                trackerA.method,
                trackerB.method,
                trackerBDiffMethod.method,
            ],
        };

        expect(filterService.filter(data, filterBy, { env: [], method: [] })).to.deep.equal([
            trackerA,
            trackerBDiffEnv,
        ]);
    });

    it('exclude data not matching filter after two filter param from different filter groups are not present', () => {
        let filterBy = {
            env: [
                trackerA.env,
                trackerBDiffEnv.env,
            ],
            method: [
                trackerB.method,
                trackerBDiffMethod.method,
            ],
        };

        expect(filterService.filter(data, filterBy, { env: [], method: [] })).to.deep.equal([
            trackerBDiffEnv,
        ]);
    });

    it('exclude all data when filter groups are empty but exist in filter', () => {
        let filterBy = {
            env: [],
            method: [],
        };

        expect(filterService.filter(data, filterBy, { env: [], method: [] })).to.deep.equal([]);
    });

    it('returns all data when filter groups are not present in filter', () => {
        let filterBy = {};

        expect(filterService.filter(data, filterBy)).to.deep.equal([
            trackerA,
            trackerB,
            trackerB,
            trackerBDiffEnv,
            trackerBDiffMethod,
        ]);
    });

    it('has optimal filter by excluding full list of filter group from filtering logic', () => {
        let spy = sinon.spy(helperService, 'isIn');

        let filterBy = {
            env: [trackerA.env, trackerB.env],
            method: [trackerA.method],
            id: [trackerA.id],
        };

        filterService.filter([trackerA, trackerB], filterBy, {
            env: [trackerB.env, trackerA.env],
            method: [trackerB.method, trackerA.method],
            id: [trackerB.id, trackerA.id],
        });

        expect(spy.callCount).to.equal(3);
        expect(spy.getCall(0).calledWith([trackerA.method], trackerA.method)).to.be.true;
        expect(spy.getCall(1).calledWith([trackerA.id], trackerA.id)).to.be.true;
        expect(spy.getCall(2).calledWith([trackerA.method], trackerB.method)).to.be.true;

        helperService.isIn.restore();
    });
});

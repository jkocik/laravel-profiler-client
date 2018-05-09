import Tracker from '@/models/tracker';
import helperService from '@/services/helper.service';
import { filterService } from '@/services/filter.store.service';
import { dummyTrackerData, dummyTrackerDataB } from './../../../fixtures/es6';

describe('Filter Store Service', () => {
    let dummyTracker;
    let dummyTrackerB;
    let dummyTrackerBDiffEnv;
    let dummyTrackerBDiffVersion;
    let data;

    beforeEach(() => {
        dummyTracker = new Tracker(dummyTrackerData);
        dummyTrackerB = new Tracker(dummyTrackerDataB);
        dummyTrackerBDiffEnv = new Tracker(dummyTrackerDataB);
        dummyTrackerBDiffEnv.env = 'production';
        dummyTrackerBDiffVersion = new Tracker(dummyTrackerDataB);
        dummyTrackerBDiffVersion.laravel_version = '5.4.0';
        data = [
            dummyTracker,
            dummyTrackerB,
            dummyTrackerB,
            dummyTrackerBDiffEnv,
            dummyTrackerBDiffVersion,
        ];
    });

    it('returns filtered data', () => {
        let filterBy = {
            env: [
                dummyTracker.env,
                dummyTrackerB.env,
                dummyTrackerBDiffEnv.env,
            ],
        };

        expect(filterService.filter(data, filterBy, { env: [] })).to.deep.equal([
            dummyTracker,
            dummyTrackerB,
            dummyTrackerB,
            dummyTrackerBDiffEnv,
            dummyTrackerBDiffVersion,
        ]);

        filterBy.env.splice(1, 1);
        expect(filterService.filter(data, filterBy, { env: [] })).to.deep.equal([
            dummyTracker,
            dummyTrackerBDiffEnv,
        ]);
    });

    it('returns data filtered by many params', () => {
        let filterBy = {
            env: [
                dummyTracker.env,
                dummyTrackerB.env,
                dummyTrackerBDiffEnv.env,
            ],
            laravel_version: [
                dummyTracker.laravel_version,
                dummyTrackerB.laravel_version,
                dummyTrackerBDiffVersion.laravel_version,
            ],
        };

        expect(filterService.filter(data, filterBy, { env: [], laravel_version: [] })).to.deep.equal([
            dummyTracker,
            dummyTrackerB,
            dummyTrackerB,
            dummyTrackerBDiffEnv,
            dummyTrackerBDiffVersion,
        ]);
    });

    it('exclude data not matching filter after one filter param is not present', () => {
        let filterBy = {
            env: [
                dummyTracker.env,
                dummyTrackerBDiffEnv.env,
            ],
            laravel_version: [
                dummyTracker.laravel_version,
                dummyTrackerB.laravel_version,
                dummyTrackerBDiffVersion.laravel_version,
            ],
        };

        expect(filterService.filter(data, filterBy, { env: [], laravel_version: [] })).to.deep.equal([
            dummyTracker,
            dummyTrackerBDiffEnv,
        ]);
    });

    it('exclude data not matching filter after two filter param from different filter groups are not present', () => {
        let filterBy = {
            env: [
                dummyTracker.env,
                dummyTrackerBDiffEnv.env,
            ],
            laravel_version: [
                dummyTrackerB.laravel_version,
                dummyTrackerBDiffVersion.laravel_version,
            ],
        };

        expect(filterService.filter(data, filterBy, { env: [], laravel_version: [] })).to.deep.equal([
            dummyTrackerBDiffEnv,
        ]);
    });

    it('exclude all data when filter groups are empty but exist in filter', () => {
        let filterBy = {
            env: [],
            laravel_version: [],
        };

        expect(filterService.filter(data, filterBy, { env: [], laravel_version: [] })).to.deep.equal([]);
    });

    it('returns all data when filter groups are not present in filter', () => {
        let filterBy = {};

        expect(filterService.filter(data, filterBy)).to.deep.equal([
            dummyTracker,
            dummyTrackerB,
            dummyTrackerB,
            dummyTrackerBDiffEnv,
            dummyTrackerBDiffVersion,
        ]);
    });

    it('has optimal filter by excluding full list of filter group from filtering logic', () => {
        let spy = sinon.spy(helperService, 'isIn');

        let filterBy = {
            env: [ dummyTracker.env, dummyTrackerB.env ],
            laravel_version: [ dummyTracker.laravel_version ],
            id: [ dummyTracker.id ],
        };

        filterService.filter([ dummyTracker, dummyTrackerB ], filterBy, {
            env: [ dummyTrackerB.env, dummyTracker.env ],
            laravel_version: [ dummyTrackerB.laravel_version, dummyTracker.laravel_version ],
            id: [ dummyTrackerB.id, dummyTracker.id ],
        });

        expect(spy.callCount).to.equal(3);
        expect(spy.getCall(0).calledWith([ dummyTracker.laravel_version ], dummyTracker.laravel_version)).to.be.true;
        expect(spy.getCall(1).calledWith([ dummyTracker.id ], dummyTracker.id)).to.be.true;
        expect(spy.getCall(2).calledWith([ dummyTracker.laravel_version ], dummyTrackerB.laravel_version)).to.be.true;
    });
});

import { filterService } from '@/services/filter.service';
import { dummyTracker, dummyTrackerB } from './../../../fixtures/es6';

describe('Filter Service', () => {
    let dummyTrackerBDiffEnv = Object.assign({}, dummyTrackerB, { env: 'production' });
    let dummyTrackerBDiffVersion = Object.assign({}, dummyTrackerB, { version: '5.4.0' });
    let data;

    beforeEach(() => {
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

        expect(filterService.filter(data, filterBy)).to.deep.equal([
            dummyTracker,
            dummyTrackerB,
            dummyTrackerB,
            dummyTrackerBDiffEnv,
            dummyTrackerBDiffVersion,
        ]);

        delete filterBy.env[1];
        expect(filterService.filter(data, filterBy)).to.deep.equal([
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
            version: [
                dummyTracker.version,
                dummyTrackerB.version,
                dummyTrackerBDiffVersion.version,
            ],
        };

        expect(filterService.filter(data, filterBy)).to.deep.equal([
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
            version: [
                dummyTracker.version,
                dummyTrackerB.version,
                dummyTrackerBDiffVersion.version,
            ],
        };

        expect(filterService.filter(data, filterBy)).to.deep.equal([
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
            version: [
                dummyTrackerB.version,
                dummyTrackerBDiffVersion.version,
            ],
        };

        expect(filterService.filter(data, filterBy)).to.deep.equal([
            dummyTrackerBDiffEnv,
        ]);
    });

    it('exclude all data when filter groups are empty but exist in filter', () => {
        let filterBy = {
            env: [],
            version: [],
        };

        expect(filterService.filter(data, filterBy)).to.deep.equal([]);
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
});

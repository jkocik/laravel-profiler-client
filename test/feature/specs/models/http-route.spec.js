import HttpRoute from '@/models/http-route';
import { dummyTrackerData } from './../../../fixtures/es6';

describe('HttpRoute Model', () => {
    it('has methods', () => {
        let route = new HttpRoute(dummyTrackerData.data.route);

        expect(route.methods).to.equal(dummyTrackerData.data.route.methods.join(', '));
    });

    it('has name', () => {
        let routeA = new HttpRoute(dummyTrackerData.data.route);
        let routeB = new HttpRoute(Object.assign({}, dummyTrackerData.data.route, { name: undefined }));

        expect(routeA.name).to.equal(dummyTrackerData.data.route.name);
        expect(routeB.name).to.equal('---');
    });

    it('has prefix', () => {
        let routeA = new HttpRoute(dummyTrackerData.data.route);
        let routeB = new HttpRoute(Object.assign({}, dummyTrackerData.data.route, { prefix: undefined }));

        expect(routeA.prefix).to.equal(dummyTrackerData.data.route.prefix);
        expect(routeB.prefix).to.equal('---');
    });

    it('has middleware', () => {
        let routeA = new HttpRoute(dummyTrackerData.data.route);
        let routeB = new HttpRoute(Object.assign({}, dummyTrackerData.data.route, { middleware: [] }));

        expect(routeA.middleware).to.equal(dummyTrackerData.data.route.middleware.join(', '));
        expect(routeB.middleware).to.equal('---');
    });
});

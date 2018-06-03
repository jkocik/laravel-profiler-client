import HttpRoute from '@/models/http-route';
import { trackerFactory } from './../test-helper';

describe('HttpRoute Model', () => {
    let trackerSource;

    beforeEach(() => {
        trackerSource = trackerFactory.create();
    });

    it('has methods', () => {
        let route = new HttpRoute(trackerSource.data.route);

        expect(route.methods).to.equal(trackerSource.data.route.methods.join(', '));
    });

    it('has name', () => {
        let trackerSourceB = trackerFactory.create('data.route', { name: undefined });
        let routeA = new HttpRoute(trackerSource.data.route);
        let routeB = new HttpRoute(trackerSourceB.data.route);

        expect(routeA.name).to.equal(trackerSource.data.route.name);
        expect(routeB.name).to.equal('---');
    });

    it('has prefix', () => {
        let trackerSourceB = trackerFactory.create('data.route', { prefix: undefined });
        let routeA = new HttpRoute(trackerSource.data.route);
        let routeB = new HttpRoute(trackerSourceB.data.route);

        expect(routeA.prefix).to.equal(trackerSource.data.route.prefix);
        expect(routeB.prefix).to.equal('---');
    });
});

import { trackerFactory } from './../test-helper';
import { BasePerformance } from '@/models/base-performance';

describe('BasePerformance Model', () => {
    it('has memory peak', () => {
        let trackerSourceA = trackerFactory.create('data.performance.memory', { peak: 209715 });
        let trackerSourceB = trackerFactory.create('data.performance.memory', { peak: 1048576 });
        let trackerSourceC = trackerFactory.create('data.performance.memory', { peak: 1289740 });

        let performanceA = new BasePerformance(trackerSourceA.data.performance);
        let performanceB = new BasePerformance(trackerSourceB.data.performance);
        let performanceC = new BasePerformance(trackerSourceC.data.performance);

        expect(performanceA.memory.peak).to.equal('0.20');
        expect(performanceA.memoryPeakForHuman).to.equal('0.20MB');
        expect(performanceB.memory.peak).to.equal('1.00');
        expect(performanceB.memoryPeakForHuman).to.equal('1.00MB');
        expect(performanceC.memory.peak).to.equal('1.23');
        expect(performanceC.memoryPeakForHuman).to.equal('1.23MB');
    });

    it('has laravel execution time', () => {
        let trackerSourceA = trackerFactory.create('data.performance.timer', { laravel: 36 });
        let trackerSourceB = trackerFactory.create('data.performance.timer', { laravel: 34 });
        let trackerSourceC = trackerFactory.create('data.performance.timer', { laravel: 350.1 });
        let trackerSourceD = trackerFactory.create('data.performance.timer', { laravel: 3501.1 });

        let performanceA = new BasePerformance(trackerSourceA.data.performance);
        let performanceB = new BasePerformance(trackerSourceB.data.performance);
        let performanceC = new BasePerformance(trackerSourceC.data.performance);
        let performanceD = new BasePerformance(trackerSourceD.data.performance);

        expect(performanceA.laravel).to.equal('0.036');
        expect(performanceA.laravelTimeForHuman).to.equal('0.04s');
        expect(performanceB.laravel).to.equal('0.034');
        expect(performanceB.laravelTimeForHuman).to.equal('0.03s');
        expect(performanceC.laravel).to.equal('0.350');
        expect(performanceC.laravelTimeForHuman).to.equal('0.35s');
        expect(performanceD.laravel).to.equal('3.501');
        expect(performanceD.laravelTimeForHuman).to.equal('3.50s');
    });

    it('has boot time', () => {
        let trackerSource = trackerFactory.create();
        let performance = new BasePerformance(trackerSource.data.performance);

        expect(performance.summary.boot).to.equal('0.009');
    });

    it('has middleware time', () => {
        let trackerSource = trackerFactory.create();
        let performance = new BasePerformance(trackerSource.data.performance);

        expect(performance.summary.middleware).to.equal('0.003');
    });

    it('has request time', () => {
        let trackerSource = trackerFactory.create();
        let performance = new BasePerformance(trackerSource.data.performance);

        expect(performance.summary.request).to.equal('0.101');
    });

    it('has response time', () => {
        let trackerSource = trackerFactory.create();
        let performance = new BasePerformance(trackerSource.data.performance);

        expect(performance.summary.response).to.equal('0.002');
    });

    it('has total request if middleware is missing', () => {
        let trackerSource = trackerFactory.create('data.performance.timer', {
            laravel: 350,
            boot: 9.1234567,
            middleware: 3.448009490966797,
            request: 101.3669586181641,
            response: 2.4479793548583984,
            'total-request': 110,
        });
        delete trackerSource.data.performance.timer.middleware;
        let performance = new BasePerformance(trackerSource.data.performance);

        expect(performance.summary.hasOwnProperty('middleware')).to.be.false;
        expect(performance.summary.request).to.equal('0.110');
    });

    it('has total request if request is missing', () => {
        let trackerSource = trackerFactory.create('data.performance.timer', {
            laravel: 350,
            boot: 9.1234567,
            middleware: 3.448009490966797,
            request: 101.3669586181641,
            response: 2.4479793548583984,
            'total-request': 110,
        });
        delete trackerSource.data.performance.timer.request;
        let performance = new BasePerformance(trackerSource.data.performance);

        expect(performance.summary.hasOwnProperty('middleware')).to.be.false;
        expect(performance.summary.request).to.equal('0.110');
    });

    it('has time of other actions', () => {
        let trackerSource = trackerFactory.create('data.performance', { timer: {
            laravel: 1026,
            boot: 2,
            middleware: 3,
            request: 1012,
            response: 2,
            'total-request': 500,
        }});
        let performance = new BasePerformance(trackerSource.data.performance);

        expect(performance.summary.other).to.equal('0.007');
    });

    it('has custom timer', () => {
        let trackerSource = trackerFactory.create();
        let performance = new BasePerformance(trackerSource.data.performance);

        expect(performance.hasCustom()).to.be.true;
    });

    it('has not custom timer if custom data are not provided at all', () => {
        let trackerSource = trackerFactory.create('data.performance.timer', {
            laravel: 1000,
            'custom-time': undefined,
        });
        delete trackerSource.data.performance.timer['custom-time'];
        let performance = new BasePerformance(trackerSource.data.performance);

        expect(performance.hasCustom()).to.be.false;
    });
});

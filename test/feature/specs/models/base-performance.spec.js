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

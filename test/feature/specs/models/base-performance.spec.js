import { trackerFactory } from './../test-helper';
import { BasePerformance } from '@/models/base-performance';

describe('BasePerformance Model', () => {
    it('has memory peak', () => {
        let trackerA = trackerFactory.create('data.performance.memory', { peak: 209715 });
        let trackerB = trackerFactory.create('data.performance.memory', { peak: 1048576 });
        let trackerC = trackerFactory.create('data.performance.memory', { peak: 1289740 });

        let performanceA = new BasePerformance(trackerA.data.performance);
        let performanceB = new BasePerformance(trackerB.data.performance);
        let performanceC = new BasePerformance(trackerC.data.performance);

        expect(performanceA.memory.peak).to.equal('0.20');
        expect(performanceA.memoryPeakForHuman).to.equal('0.20MB');
        expect(performanceB.memory.peak).to.equal('1.00');
        expect(performanceB.memoryPeakForHuman).to.equal('1.00MB');
        expect(performanceC.memory.peak).to.equal('1.23');
        expect(performanceC.memoryPeakForHuman).to.equal('1.23MB');
    });

    it('has laravel execution time', () => {
        let trackerA = trackerFactory.create('data.performance.timer', { laravel: 35 });
        let trackerB = trackerFactory.create('data.performance.timer', { laravel: 350 });
        let trackerC = trackerFactory.create('data.performance.timer', { laravel: 350.1 });
        let trackerD = trackerFactory.create('data.performance.timer', { laravel: 3501.1 });

        let performanceA = new BasePerformance(trackerA.data.performance);
        let performanceB = new BasePerformance(trackerB.data.performance);
        let performanceC = new BasePerformance(trackerC.data.performance);
        let performanceD = new BasePerformance(trackerD.data.performance);

        expect(performanceA.timer.laravel).to.equal('0.04');
        expect(performanceA.timerLaravelForHuman).to.equal('0.04s');
        expect(performanceB.timer.laravel).to.equal('0.35');
        expect(performanceB.timerLaravelForHuman).to.equal('0.35s');
        expect(performanceC.timer.laravel).to.equal('0.35');
        expect(performanceC.timerLaravelForHuman).to.equal('0.35s');
        expect(performanceD.timer.laravel).to.equal('3.50');
        expect(performanceD.timerLaravelForHuman).to.equal('3.50s');
    });
});

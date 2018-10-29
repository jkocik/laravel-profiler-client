import { trackerFactory } from './../test-helper';
import ConsolePerformance from '@/models/console-performance';

describe('ConsolePerformance Model', () => {
    it('has boot time', () => {
        let trackerSource = trackerFactory.create();
        let performance = new ConsolePerformance(trackerSource.data.performance);

        expect(performance.summary.boot).to.equal('0.001');
    });

    // it('has time of other actions', () => {
    //     let trackerSource = trackerFactory.create('data.performance', { timer: {
    //             laravel: 1026,
    //             boot: 2,
    //             middleware: 3,
    //             request: 1012,
    //             response: 2,
    //             'total-request': 500,
    //         }});
    //     let performance = new HttpPerformance(trackerSource.data.performance);
    //
    //     expect(performance.summary.other).to.equal('0.007');
    // });
});

import { trackerFactory } from './../test-helper';
import ConsoleFinishedRequest from '@/models/console-finished-request';

describe('ConsoleFinishedRequest Model', () => {
    let trackerSource;

    beforeEach(() => {
        trackerSource = trackerFactory.create();
    });

    it('has arguments', () => {
        let consoleFinishedRequest = new ConsoleFinishedRequest(trackerSource.meta, trackerSource.data.request);

        expect(consoleFinishedRequest.arguments).to.equal(trackerSource.data.request.arguments);
    });

    it('has options', () => {
        let consoleFinishedRequest = new ConsoleFinishedRequest(trackerSource.meta, trackerSource.data.request);

        expect(consoleFinishedRequest.options).to.equal(trackerSource.data.request.options);
    });
});

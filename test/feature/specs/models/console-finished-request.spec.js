import { dummyTrackerData } from './../../../fixtures/es6';
import ConsoleFinishedRequest from '@/models/console-finished-request';

describe('ConsoleFinishedRequest Model', () => {
    it('has command', () => {
        let consoleFinishedRequest = new ConsoleFinishedRequest(dummyTrackerData.meta, dummyTrackerData.data.request);

        expect(consoleFinishedRequest.command).to.equal(dummyTrackerData.meta.path);
    });

    it('has arguments', () => {
        let consoleFinishedRequest = new ConsoleFinishedRequest(dummyTrackerData.meta, dummyTrackerData.data.request);

        expect(consoleFinishedRequest.arguments).to.equal(dummyTrackerData.data.request.arguments);
    });

    it('has options', () => {
        let consoleFinishedRequest = new ConsoleFinishedRequest(dummyTrackerData.meta, dummyTrackerData.data.request);

        expect(consoleFinishedRequest.options).to.equal(dummyTrackerData.data.request.options);
    });
});

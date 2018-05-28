import { dummyTrackerData } from './../../../fixtures/es6';
import ConsoleFinishedRequest from '@/models/console-finished-request';

describe('ConsoleFinishedRequest Model', () => {
    it('has required command', () => {
        let consoleFinishedRequest = new ConsoleFinishedRequest(dummyTrackerData.meta, dummyTrackerData.data.request);

        expect(consoleFinishedRequest.command).to.equal(dummyTrackerData.meta.path);
    });

    it('has required arguments', () => {
        let consoleFinishedRequest = new ConsoleFinishedRequest(dummyTrackerData.meta, dummyTrackerData.data.request);

        expect(consoleFinishedRequest.arguments).to.equal(dummyTrackerData.data.request.arguments);
    });

    it('has required options', () => {
        let consoleFinishedRequest = new ConsoleFinishedRequest(dummyTrackerData.meta, dummyTrackerData.data.request);

        expect(consoleFinishedRequest.options).to.equal(dummyTrackerData.data.request.options);
    });
});

import HttpResponse from '@/models/http-response';
import { trackerFactory } from './../test-helper';

describe('HttpResponse Model', () => {
    let httpResponse;
    let trackerSource;

    beforeEach(() => {
        trackerSource = trackerFactory.create();
        httpResponse = new HttpResponse(trackerSource.data.response, trackerSource.data.content);
    });

    it('has content', () => {
        expect(httpResponse.content).to.equal(trackerSource.data.content);
        expect(httpResponse.hasContent()).to.be.true;

        trackerSource = trackerFactory.create('data', { content: '' });
        httpResponse = new HttpResponse(trackerSource.data.response, trackerSource.data.content);
        expect(httpResponse.hasContent()).to.be.false;
    });

    it('has headers', () => {
        expect(httpResponse.headers).to.deep.equal(trackerSource.data.response.headers);
    });

    it('knows if content is JSON', () => {
        trackerSource = trackerFactory.create('data', { content: '' });
        httpResponse = new HttpResponse(trackerSource.data.response, trackerSource.data.content);
        expect(httpResponse.isJson()).to.be.false;

        trackerSource = trackerFactory.create('data', { content: '<htlm></htlm>' });
        httpResponse = new HttpResponse(trackerSource.data.response, trackerSource.data.content);
        expect(httpResponse.isJson()).to.be.false;

        trackerSource = trackerFactory.create('data', { content: '{ "a": true }' });
        httpResponse = new HttpResponse(trackerSource.data.response, trackerSource.data.content);
        expect(httpResponse.isJson()).to.be.true;
    });
});

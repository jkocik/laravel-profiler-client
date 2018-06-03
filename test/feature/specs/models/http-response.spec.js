import HttpResponse from '@/models/http-response';
import { trackerFactory } from './../test-helper';

describe('HttpResponse Model', () => {
    let httpResponse;
    let trackerSource;

    beforeEach(() => {
        trackerSource = trackerFactory.create();
        httpResponse = new HttpResponse(trackerSource.data.response);
    });

    it('has content', () => {
        expect(httpResponse.content).to.equal(trackerSource.data.response.content);
        expect(httpResponse.hasContent()).to.be.true;

        trackerSource = trackerFactory.create('data.response', { content: '' });
        httpResponse = new HttpResponse(trackerSource.data.response);
        expect(httpResponse.hasContent()).to.be.false;
    });

    it('has headers', () => {
        expect(httpResponse.headers).to.deep.equal(trackerSource.data.response.headers);
    });

    it('knows if content is JSON', () => {
        trackerSource = trackerFactory.create('data.response', { content: '' });
        httpResponse = new HttpResponse(trackerSource.data.response);
        expect(httpResponse.isJson()).to.be.false;

        trackerSource = trackerFactory.create('data.response', { content: '<htlm></htlm>' });
        httpResponse = new HttpResponse(trackerSource.data.response);
        expect(httpResponse.isJson()).to.be.false;

        trackerSource = trackerFactory.create('data.response', { content: '{ "a": true }' });
        httpResponse = new HttpResponse(trackerSource.data.response);
        expect(httpResponse.isJson()).to.be.true;
    });
});

import HttpRequest from '@/models/http-request';
import { trackerFactory } from './../test-helper';

describe('HttpRequest Model', () => {
    let httpRequest;
    let trackerSource;

    beforeEach(() => {
        trackerSource = trackerFactory.create();
        httpRequest = new HttpRequest(trackerSource.meta, trackerSource.data.request);
    });

    it('has ajax', () => {
        expect(trackerSource.meta.ajax).to.be.false;
        expect(httpRequest.ajax).to.be.false;

        trackerSource = trackerFactory.create('meta', { ajax: true });
        let request = new HttpRequest(trackerSource.meta, trackerSource.data.request);

        expect(request.ajax).to.be.true;
    });

    it('has json', () => {
        expect(trackerSource.meta.json).to.be.false;
        expect(httpRequest.json).to.be.false;

        trackerSource = trackerFactory.create('meta', { json: true });
        let request = new HttpRequest(trackerSource.meta, trackerSource.data.request);

        expect(request.json).to.be.true;
    });

    it('has pjax', () => {
        expect(trackerSource.data.request.pjax).to.be.false;
        expect(httpRequest.pjax).to.be.false;

        trackerSource = trackerFactory.create('data.request', { pjax: true });
        let request = new HttpRequest(trackerSource.meta, trackerSource.data.request);

        expect(request.pjax).to.be.true;
    });

    it('has ip', () => {
        expect(httpRequest.ip).to.equal(trackerSource.data.request.ip);
    });

    it('has url', () => {
        expect(httpRequest.url).to.equal(trackerSource.data.request.url);
    });

    it('has query', () => {
        expect(httpRequest.query).to.deep.equal(trackerSource.data.request.query);
    });

    it('has server', () => {
        expect(httpRequest.server).to.deep.equal(trackerSource.data.request.server);
    });

    it('has header', () => {
        expect(httpRequest.header).to.deep.equal(trackerSource.data.request.header);
    });

    it('has input', () => {
        expect(httpRequest.input).to.deep.equal(trackerSource.data.request.input);
    });

    it('has files', () => {
        expect(httpRequest.files).to.deep.equal(trackerSource.data.request.files);
    });

    it('has cookie', () => {
        expect(httpRequest.cookie).to.deep.equal(trackerSource.data.request.cookie);
    });

    it('counts input together with files', () => {
        trackerSource = trackerFactory
            .set('data.request', { input: { 1: 'a', 2: 'b', 3: 'c' } })
            .set('data.request', { files: { 1: 'x', 2: 'y', 3: 'z', 4: 'q' } })
            .create();
        let request = new HttpRequest(trackerSource.meta, trackerSource.data.request);

        expect(request.countInput()).to.equal(7);
    });

    it('checks if input or files are provided', () => {
        expect(Object.keys(httpRequest.input).length).to.equal(2);
        expect(Object.keys(httpRequest.files).length).to.equal(2);
        expect(httpRequest.hasInput()).to.be.true;

        let request;

        trackerSource = trackerFactory
            .set('data.request', { input: { a: 1 } })
            .set('data.request', { files: [] })
            .create();
        request = new HttpRequest(trackerSource.meta, trackerSource.data.request);
        expect(request.hasInput()).to.be.true;

        trackerSource = trackerFactory
            .set('data.request', { input: [] })
            .set('data.request', { files: { b: 2 } })
            .create();
        request = new HttpRequest(trackerSource.meta, trackerSource.data.request);
        expect(request.hasInput()).to.be.true;

        trackerSource = trackerFactory
            .set('data.request', { input: [] })
            .set('data.request', { files: [] })
            .create();
        request = new HttpRequest(trackerSource.meta, trackerSource.data.request);
        expect(request.hasInput()).to.be.false;
    });
});

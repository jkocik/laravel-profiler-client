import HttpRequest from '@/models/http-request';
import { dummyTrackerData } from './../../../fixtures/es6';

describe('HttpRequest Model', () => {
    let httpRequest;

    beforeEach(() => {
        httpRequest = new HttpRequest(dummyTrackerData.meta, dummyTrackerData.data.request);
    });

    it('has ajax', () => {
        expect(dummyTrackerData.meta.ajax).to.be.false;
        expect(httpRequest.ajax).to.be.false;

        let meta = { ajax: true };
        let request = new HttpRequest(meta, dummyTrackerData.data.request);

        expect(request.ajax).to.be.true;
    });

    it('has json', () => {
        expect(dummyTrackerData.meta.json).to.be.false;
        expect(httpRequest.json).to.be.false;

        let meta = { json: true };
        let request = new HttpRequest(meta, dummyTrackerData.data.request);

        expect(request.json).to.be.true;
    });

    it('has pjax', () => {
        expect(dummyTrackerData.data.request.pjax).to.be.false;
        expect(httpRequest.pjax).to.be.false;

        let dataRequest = { pjax: true };
        let request = new HttpRequest(dummyTrackerData.meta, dataRequest);

        expect(request.pjax).to.be.true;
    });

    it('has ip', () => {
        expect(httpRequest.ip).to.equal(dummyTrackerData.data.request.ip);
    });

    it('has url', () => {
        expect(httpRequest.url).to.equal(dummyTrackerData.data.request.url);
    });

    it('has query', () => {
        expect(httpRequest.query).to.deep.equal(dummyTrackerData.data.request.query);
    });

    it('has server', () => {
        expect(httpRequest.server).to.deep.equal(dummyTrackerData.data.request.server);
    });

    it('has header', () => {
        expect(httpRequest.header).to.deep.equal(dummyTrackerData.data.request.header);
    });

    it('has input', () => {
        expect(httpRequest.input).to.deep.equal(dummyTrackerData.data.request.input);
    });

    it('has files', () => {
        expect(httpRequest.files).to.deep.equal(dummyTrackerData.data.request.files);
    });

    it('has cookie', () => {
        expect(httpRequest.cookie).to.deep.equal(dummyTrackerData.data.request.cookie);
    });

    it('counts input together with files', () => {
        expect(Object.keys(httpRequest.input).length).to.equal(3);
        expect(Object.keys(httpRequest.files).length).to.equal(2);

        expect(httpRequest.countInput()).to.equal(5);
    });

    it('checks if input or files are provided', () => {
        expect(Object.keys(httpRequest.input).length).to.equal(3);
        expect(Object.keys(httpRequest.files).length).to.equal(2);
        expect(httpRequest.hasInput()).to.be.true;

        let request = {};

        request = new HttpRequest(dummyTrackerData.meta, {
            input: { 'a': 1 },
            files: [],
        });
        expect(request.hasInput()).to.be.true;

        request = new HttpRequest(dummyTrackerData.meta, {
            input: [],
            files: { 'b': 2 },
        });
        expect(request.hasInput()).to.be.true;

        request = new HttpRequest(dummyTrackerData.meta, {
            input: [],
            files: [],
        });
        expect(request.hasInput()).to.be.false;
    });
});

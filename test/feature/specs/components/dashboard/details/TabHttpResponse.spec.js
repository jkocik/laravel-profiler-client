import Tracker from '@/models/tracker';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabHttpResponse from '@/components/dashboard/details/TabHttpResponse';

describe('TabHttpResponse Component', () => {
    it('has response summary tab', async () => {
        let tracker = new Tracker(trackerFactory.create());
        let wrapper = mountWithTracker(TabHttpResponse, tracker);
        let wrapperTabHttpResponseSummary = wrapper.find({ name: 'tab-http-response-summary' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(0).text()).to.equal('Response');
        expect(wrapperTabHttpResponseSummary.isVisible()).to.be.true;
        expect(wrapperTabHttpResponseSummary.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('has content tab', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { content: '<html></html>' }));
        let wrapper = mountWithTracker(TabHttpResponse, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(1).text()).to.equal('Content');

        wrapper.tabs(1).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabHttpResponseContent = wrapper.find({ name: 'tab-http-response-content' });
        expect(wrapperTabHttpResponseContent.isVisible()).to.be.true;
        expect(wrapperTabHttpResponseContent.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('content tab is enabled only if any content is present', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { content: '' }));
        let wrapper = mountWithTracker(TabHttpResponse, tracker);
        let wrapperTabHttpResponseContent = wrapper.find({ name: 'tab-http-response-content' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(1).text()).to.equal('Content');
        expect(wrapper.tabs(1).classes()).to.contain('is-disabled');
        expect(wrapperTabHttpResponseContent.exists()).to.be.false;
    });

    it('content tab is enabled only if content is provided', async () => {
        let trackerSource = trackerFactory.create('data', { content: '' });
        delete trackerSource.data.content;
        let tracker = new Tracker(trackerSource);
        let wrapper = mountWithTracker(TabHttpResponse, tracker);
        let wrapperTabHttpResponseContent = wrapper.find({ name: 'tab-http-response-content' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(1).text()).to.equal('Content');
        expect(wrapper.tabs(1).classes()).to.contain('is-disabled');
        expect(wrapperTabHttpResponseContent.exists()).to.be.false;
    });

    it('has json tab', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { content: '{ "a": 1 }' }));
        let wrapper = mountWithTracker(TabHttpResponse, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(2).text()).to.equal('JSON');

        wrapper.tabs(2).find('a').trigger('click');
        await wrapper.vm.$nextTick();
        let wrapperTabHttpResponseJson = wrapper.find({ name: 'tab-http-response-json' });
        expect(wrapperTabHttpResponseJson.isVisible()).to.be.true;
        expect(wrapperTabHttpResponseJson.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('json tab is enabled only if content is json', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { content: '<html></html>' }));
        let wrapper = mountWithTracker(TabHttpResponse, tracker);
        let wrapperTabHttpResponseJson = wrapper.find({ name: 'tab-http-response-json' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(2).text()).to.equal('JSON');
        expect(wrapper.tabs(2).classes()).to.contain('is-disabled');
        expect(wrapperTabHttpResponseJson.exists()).to.be.false;
    });
});

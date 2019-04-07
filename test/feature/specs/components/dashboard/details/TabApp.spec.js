import Tracker from '@/models/tracker';
import TabApp from '@/components/dashboard/details/TabApp';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabApp Component', () => {
    it('has application tab', async () => {
        let tracker = new Tracker(trackerFactory.create());
        let wrapper = mountWithTracker(TabApp, tracker);
        let wrapperTabApplication = wrapper.find({ name: 'tab-application' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(0).text()).to.equal('Application');
        expect(wrapperTabApplication.isVisible()).to.be.true;
        expect(wrapperTabApplication.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('has config tab', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { config: { 1: 'a', 2: 'b', 3: 'c' } }));
        let wrapper = mountWithTracker(TabApp, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(1).text()).to.equal('Config (3)');

        wrapper.tabs(1).find('a').trigger('click');
        let selectedTab = wrapper.emitted().updateActiveTab.pop().pop();
        wrapper.setProps({ activeTab: selectedTab });
        let wrapperTabConfig = wrapper.find({ name: 'tab-config' });
        expect(wrapperTabConfig.isVisible()).to.be.true;
        expect(wrapperTabConfig.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('config tab is enabled only if any config is present', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { config: undefined }));
        let wrapper = mountWithTracker(TabApp, tracker);
        let wrapperTabConfig = wrapper.find({ name: 'tab-config' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(1).text()).to.equal('Config');
        expect(wrapper.tabs(1).classes()).to.contain('is-disabled');
        expect(wrapperTabConfig.exists()).to.be.false;
    });

    it('has service providers tab', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { service_providers: [1, 2, 3] }));
        let wrapper = mountWithTracker(TabApp, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(2).text()).to.equal('Service Providers (3)');

        wrapper.tabs(2).find('a').trigger('click');
        let selectedTab = wrapper.emitted().updateActiveTab.pop().pop();
        wrapper.setProps({ activeTab: selectedTab });
        let wrapperTabServiceProviders = wrapper.find({ name: 'tab-service-providers' });
        expect(wrapperTabServiceProviders.isVisible()).to.be.true;
        expect(wrapperTabServiceProviders.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('service providers tab is enabled only if any service provider is present', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { service_providers: undefined }));
        let wrapper = mountWithTracker(TabApp, tracker);
        let wrapperTabServiceProviders = wrapper.find({ name: 'tab-service-providers' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(2).text()).to.equal('Service Providers');
        expect(wrapper.tabs(2).classes()).to.contain('is-disabled');
        expect(wrapperTabServiceProviders.exists()).to.be.false;
    });

    it('has bindings tab', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { bindings: [1, 2, 3] }));
        let wrapper = mountWithTracker(TabApp, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(3).text()).to.equal('Bindings (3)');

        wrapper.tabs(3).find('a').trigger('click');
        let selectedTab = wrapper.emitted().updateActiveTab.pop().pop();
        wrapper.setProps({ activeTab: selectedTab });
        let wrapperTabBindings = wrapper.find({ name: 'tab-bindings' });
        expect(wrapperTabBindings.isVisible()).to.be.true;
        expect(wrapperTabBindings.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('bandings tab is enabled only if any binding is present', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { bindings: undefined }));
        let wrapper = mountWithTracker(TabApp, tracker);
        let wrapperTabBindings = wrapper.find({ name: 'tab-bindings' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(3).text()).to.equal('Bindings');
        expect(wrapper.tabs(3).classes()).to.contain('is-disabled');
        expect(wrapperTabBindings.exists()).to.be.false;
    });

    it('has paths tab', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { paths: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] }));
        let wrapper = mountWithTracker(TabApp, tracker);

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(4).text()).to.equal('Paths (3)');

        wrapper.tabs(4).find('a').trigger('click');
        let selectedTab = wrapper.emitted().updateActiveTab.pop().pop();
        wrapper.setProps({ activeTab: selectedTab });
        let wrapperTabPaths = wrapper.find({ name: 'tab-paths' });
        expect(wrapperTabPaths.isVisible()).to.be.true;
        expect(wrapperTabPaths.props().tracker).to.equal(wrapper.props().tracker);
    });

    it('paths tab is enabled only if any path is present', async () => {
        let tracker = new Tracker(trackerFactory.create('data', { paths: undefined }));
        let wrapper = mountWithTracker(TabApp, tracker);
        let wrapperTabPaths = wrapper.find({ name: 'tab-paths' });

        await wrapper.vm.$nextTick();
        expect(wrapper.tabs(4).text()).to.equal('Paths');
        expect(wrapper.tabs(4).classes()).to.contain('is-disabled');
        expect(wrapperTabPaths.exists()).to.be.false;
    });
});

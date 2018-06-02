import Tracker from '@/models/tracker';
import AppDashboard from '@/components/AppDashboard';
import { trackerFactory, mountWithoutProps } from './../test-helper';

describe('AppDashboard Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mountWithoutProps(AppDashboard);
    });

    it('sees meta data of profiler after data are delivered', async () => {
        expect(wrapper.find('p').text()).to.contain(wrapper.vm.$t('dashboard.trackers-list-is-empty'));

        let tracker = new Tracker(trackerFactory.create());
        wrapper.vm.$store.commit('trackers/store', tracker);

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('p').exists()).to.be.false;
        expect(wrapper.vm.$store.state.trackers.all).to.have.lengthOf(1);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(2)').text()).to.contain(tracker.executionAt);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(3)').text()).to.contain(tracker.env);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(4)').text()).to.contain(tracker.running);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(5)').text()).to.contain(tracker.type);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(6)').text()).to.contain(tracker.method);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(6)').text()).to.contain(tracker.status);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(6)').text()).to.contain(tracker.path);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(7)').text()).to.contain(tracker.laravelVersion);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(7)').text()).to.contain(tracker.phpVersion);
    });

    it('sees meta data of profiler in descending order', async () => {
        let trackerA = new Tracker(trackerFactory.create());
        let trackerB = new Tracker(trackerFactory.create('meta', { env: 'testing' }));
        wrapper.vm.$store.commit('trackers/store', trackerA);
        wrapper.vm.$store.commit('trackers/store', trackerB);

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.$store.state.trackers.all).to.have.lengthOf(2);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(3)').text()).to.contain(trackerB.env);
        expect(wrapper.find('table tr:nth-child(2) td:nth-child(3)').text()).to.contain(trackerA.env);
    });

    it('sees meta data of profiler paginated', async () => {
        [
            new Tracker(trackerFactory.create('meta', { env: 'localA' })),
            new Tracker(trackerFactory.create('meta', { env: 'localB' })),
            new Tracker(trackerFactory.create('meta', { env: 'localC' })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.setData({ perPage: 2 });

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('table').text()).to.contain('localC');
        expect(wrapper.find('table').text()).to.contain('localB');
        expect(wrapper.find('table').text()).to.not.contain('localA');
        expect(wrapper.findAll('.pagination-link').length).to.equal(2);
    });

    it('shows 15 items per page by default', () => {
        expect(wrapper.vm.perPage).to.equal(15);
    });

    it('filters profilers by running', async () => {
        [
            new Tracker(trackerFactory.create('meta', { is_running_in_console: true })),
            new Tracker(trackerFactory.create('meta', { is_running_in_console: false })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.setData({ perPage: 1 });

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('table').text()).to.contain('web');
        expect(wrapper.find('table').text()).to.not.contain('console');

        wrapper.vm.$store.commit('trackers/updateFilter', { running: [ 'console' ] });

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('table').text()).to.not.contain('web');
        expect(wrapper.find('table').text()).to.contain('console');
    });

    it('filters profilers by env', async () => {
        [
            new Tracker(trackerFactory.create('meta', { env: 'localA' })),
            new Tracker(trackerFactory.create('meta', { env: 'localB' })),
            new Tracker(trackerFactory.create('meta', { env: 'localC' })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.setData({ perPage: 2 });

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('table').text()).to.contain('localC');
        expect(wrapper.find('table').text()).to.contain('localB');
        expect(wrapper.find('table').text()).to.not.contain('localA');

        wrapper.vm.$store.commit('trackers/updateFilter', { env: [ 'localC', 'localA' ] });

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('table').text()).to.contain('localC');
        expect(wrapper.find('table').text()).to.not.contain('localB');
        expect(wrapper.find('table').text()).to.contain('localA');
    });

    it('filters profilers by type', async () => {
        [
            new Tracker(trackerFactory.create('meta', { type: 'command-finished' })),
            new Tracker(trackerFactory.create('meta', { type: 'http' })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.setData({ perPage: 1 });

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('table').text()).to.contain('http');
        expect(wrapper.find('table').text()).to.not.contain('command');

        wrapper.vm.$store.commit('trackers/updateFilter', { typeGroup: [ 'command' ] });

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('table').text()).to.not.contain('http');
        expect(wrapper.find('table').text()).to.contain('command');
    });

    it('filters profilers by statusGroup', async () => {
        [
            new Tracker(trackerFactory.create('meta', { status: 201 })),
            new Tracker(trackerFactory.create('meta', { status: 301 })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.setData({ perPage: 1 });

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('table').text()).to.contain('301');
        expect(wrapper.find('table').text()).to.not.contain('201');

        wrapper.vm.$store.commit('trackers/updateFilter', { statusGroup: [ '2xx' ] });

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('table').text()).to.not.contain('301');
        expect(wrapper.find('table').text()).to.contain('201');
    });

    it('filters profilers by method', async () => {
        [
            new Tracker(trackerFactory.create('meta', { method: 'GET' })),
            new Tracker(trackerFactory.create('meta', { method: 'POST' })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.setData({ perPage: 1 });

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('table').text()).to.contain('POST');
        expect(wrapper.find('table').text()).to.not.contain('GET');

        wrapper.vm.$store.commit('trackers/updateFilter', { method: [ 'GET' ] });

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('table').text()).to.not.contain('POST');
        expect(wrapper.find('table').text()).to.contain('GET');
    });

    it('toggles visibility of row details', async () => {
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 1 })));
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 2 })));

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();

        let tr = wrapper.find('table tr:nth-child(1)');

        tr.trigger('click');
        let trDetailsA = wrapper.find('table tr:nth-child(1) + tr.detail');
        expect(trDetailsA.exists()).to.be.true;
        expect(trDetailsA.isVisible()).to.be.true;
        expect(trDetailsA.find('td').attributes().colspan).to.equal('6');

        tr.trigger('click');
        let trDetailsABis = wrapper.find('table tr:nth-child(1) + tr.detail');
        expect(trDetailsABis.exists()).to.be.false;
    });

    it('remembers last active tab of any details row and uses it when new details are opened to activate the same tab', async () => {
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 1 })));
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 2 })));

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        let trA = wrapper.find('table tr.tracker-row:nth-child(1)');
        let trB = wrapper.find('table tr.tracker-row:nth-child(2)');
        let trDetailsA = () => wrapper.findAll('tr.detail').at(0);
        let trDetailsB = () => wrapper.findAll('tr.detail').at(1);
        let firstTabOf = (trDetails) => trDetails.findAll('li').at(0);
        let secondTabOf = (trDetails) => trDetails.findAll('li').at(1);
        let firstTabLinkOf = (trDetails) => trDetails.findAll('li a').at(0);
        let secondTabLinkOf = (trDetails) => trDetails.findAll('li a').at(1);

        trA.trigger('click');
        await wrapper.vm.$nextTick();
        expect(firstTabOf(trDetailsA()).classes()).to.contains('is-active');
        expect(secondTabOf(trDetailsA()).classes()).to.not.contains('is-active');

        secondTabLinkOf(trDetailsA()).trigger('click');
        await wrapper.vm.$nextTick();
        expect(firstTabOf(trDetailsA()).classes()).to.not.contains('is-active');
        expect(secondTabOf(trDetailsA()).classes()).to.contains('is-active');

        trB.trigger('click');
        await wrapper.vm.$nextTick();
        expect(firstTabOf(trDetailsB()).classes()).to.not.contains('is-active');
        expect(secondTabOf(trDetailsB()).classes()).to.contains('is-active');

        firstTabLinkOf(trDetailsB()).trigger('click');
        await wrapper.vm.$nextTick();
        expect(firstTabOf(trDetailsA()).classes()).to.not.contains('is-active');
        expect(secondTabOf(trDetailsA()).classes()).to.contains('is-active');
        expect(firstTabOf(trDetailsB()).classes()).to.contains('is-active');
        expect(secondTabOf(trDetailsB()).classes()).to.not.contains('is-active');
    });

    it('remembers last time changed tab when reopen particular details', async () => {
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 1 })));
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 2 })));

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        let trA = wrapper.find('table tr.tracker-row:nth-child(1)');
        let trB = wrapper.find('table tr.tracker-row:nth-child(2)');
        let trDetailsA = () => wrapper.findAll('tr.detail').at(0);
        let trDetailsB = () => wrapper.findAll('tr.detail').at(1);
        let firstTabOf = (trDetails) => trDetails.findAll('li').at(0);
        let secondTabOf = (trDetails) => trDetails.findAll('li').at(1);
        let firstTabLinkOf = (trDetails) => trDetails.findAll('li a').at(0);
        let secondTabLinkOf = (trDetails) => trDetails.findAll('li a').at(1);

        trA.trigger('click');
        trB.trigger('click');
        await wrapper.vm.$nextTick();

        secondTabLinkOf(trDetailsB()).trigger('click');
        firstTabLinkOf(trDetailsA()).trigger('click');
        await wrapper.vm.$nextTick();

        trB.trigger('click');
        await wrapper.vm.$nextTick();

        trB.trigger('click');
        await wrapper.vm.$nextTick();
        expect(firstTabOf(trDetailsA()).classes()).to.contains('is-active');
        expect(secondTabOf(trDetailsB()).classes()).to.contains('is-active');
    });

    it('remembers last time active tab when reopen particular details even it was set by default and not changed', async () => {
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 1 })));
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 2 })));

        wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        let trA = wrapper.find('table tr.tracker-row:nth-child(1)');
        let trB = wrapper.find('table tr.tracker-row:nth-child(2)');
        let trDetailsA = () => wrapper.findAll('tr.detail').at(0);
        let trDetailsB = () => wrapper.findAll('tr.detail').at(1);
        let secondTabOf = (trDetails) => trDetails.findAll('li').at(1);
        let firstTabLinkOf = (trDetails) => trDetails.findAll('li a').at(0);
        let secondTabLinkOf = (trDetails) => trDetails.findAll('li a').at(1);

        trA.trigger('click');
        await wrapper.vm.$nextTick();

        secondTabLinkOf(trDetailsA()).trigger('click');
        trB.trigger('click');
        await wrapper.vm.$nextTick();
        expect(secondTabOf(trDetailsB()).classes()).to.contains('is-active');

        trB.trigger('click');
        await wrapper.vm.$nextTick();

        firstTabLinkOf(trDetailsA()).trigger('click');
        trB.trigger('click');
        await wrapper.vm.$nextTick();
        expect(secondTabOf(trDetailsB()).classes()).to.contains('is-active');
    });
});

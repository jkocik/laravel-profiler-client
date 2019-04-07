import Tracker from '@/models/tracker';
import AppDashboard from '@/components/AppDashboard';
import { trackerFactory, mountWithoutProps } from './../../test-helper';

describe('DashboardDetails Component (Tabs)', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mountWithoutProps(AppDashboard);
    });

    it('remembers last active tab of any details row and uses it to activate the same tab in new just opened details', async () => {
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 1 })));
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 2 })));

        let wrapperTable = wrapper.find({ name: 'dashboard-table' });
        wrapperTable.vm.$forceUpdate();
        await wrapperTable.vm.$nextTick();
        let trA = wrapperTable.find('table tr.tracker-row:nth-child(1)');
        let trB = wrapperTable.find('table tr.tracker-row:nth-child(2)');
        let trDetailsA = () => wrapperTable.findAll('tr.detail').at(0);
        let trDetailsB = () => wrapperTable.findAll('tr.detail').at(1);
        let firstTabOf = (trDetails) => trDetails.findAll('li').at(0);
        let secondTabOf = (trDetails) => trDetails.findAll('li').at(1);
        let firstTabLinkOf = (trDetails) => trDetails.findAll('li a').at(0);
        let secondTabLinkOf = (trDetails) => trDetails.findAll('li a').at(1);

        trA.trigger('click');
        await wrapperTable.vm.$nextTick();
        expect(firstTabOf(trDetailsA()).classes()).to.contains('is-active');
        expect(secondTabOf(trDetailsA()).classes()).to.not.contains('is-active');

        secondTabLinkOf(trDetailsA()).trigger('click');
        await wrapperTable.vm.$nextTick();
        expect(firstTabOf(trDetailsA()).classes()).to.not.contains('is-active');
        expect(secondTabOf(trDetailsA()).classes()).to.contains('is-active');

        trB.trigger('click');
        await wrapperTable.vm.$nextTick();
        expect(firstTabOf(trDetailsB()).classes()).to.not.contains('is-active');
        expect(secondTabOf(trDetailsB()).classes()).to.contains('is-active');

        firstTabLinkOf(trDetailsB()).trigger('click');
        await wrapperTable.vm.$nextTick();
        expect(firstTabOf(trDetailsA()).classes()).to.not.contains('is-active');
        expect(secondTabOf(trDetailsA()).classes()).to.contains('is-active');
        expect(firstTabOf(trDetailsB()).classes()).to.contains('is-active');
        expect(secondTabOf(trDetailsB()).classes()).to.not.contains('is-active');
    });

    it('remembers last time changed tab when reopen particular details', async () => {
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 1 })));
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 2 })));

        let wrapperTable = wrapper.find({ name: 'dashboard-table' });
        wrapperTable.vm.$forceUpdate();
        await wrapperTable.vm.$nextTick();
        let trA = wrapperTable.find('table tr.tracker-row:nth-child(1)');
        let trB = wrapperTable.find('table tr.tracker-row:nth-child(2)');
        let trDetailsA = () => wrapperTable.findAll('tr.detail').at(0);
        let trDetailsB = () => wrapperTable.findAll('tr.detail').at(1);
        let firstTabOf = (trDetails) => trDetails.findAll('li').at(0);
        let secondTabOf = (trDetails) => trDetails.findAll('li').at(1);
        let firstTabLinkOf = (trDetails) => trDetails.findAll('li a').at(0);
        let secondTabLinkOf = (trDetails) => trDetails.findAll('li a').at(1);

        trA.trigger('click');
        trB.trigger('click');
        await wrapperTable.vm.$nextTick();

        secondTabLinkOf(trDetailsB()).trigger('click');
        firstTabLinkOf(trDetailsA()).trigger('click');
        await wrapperTable.vm.$nextTick();

        trB.trigger('click');
        await wrapperTable.vm.$nextTick();

        trB.trigger('click');
        await wrapperTable.vm.$nextTick();
        expect(firstTabOf(trDetailsA()).classes()).to.contains('is-active');
        expect(secondTabOf(trDetailsB()).classes()).to.contains('is-active');
    });

    it('remembers last time active tab when reopen particular details even it was set by default and not changed', async () => {
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 1 })));
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 2 })));

        let wrapperTable = wrapper.find({ name: 'dashboard-table' });
        wrapperTable.vm.$forceUpdate();
        await wrapperTable.vm.$nextTick();
        let trA = wrapperTable.find('table tr.tracker-row:nth-child(1)');
        let trB = wrapperTable.find('table tr.tracker-row:nth-child(2)');
        let trDetailsA = () => wrapperTable.findAll('tr.detail').at(0);
        let trDetailsB = () => wrapperTable.findAll('tr.detail').at(1);
        let secondTabOf = (trDetails) => trDetails.findAll('li').at(1);
        let firstTabLinkOf = (trDetails) => trDetails.findAll('li a').at(0);
        let secondTabLinkOf = (trDetails) => trDetails.findAll('li a').at(1);

        trA.trigger('click');
        await wrapperTable.vm.$nextTick();

        secondTabLinkOf(trDetailsA()).trigger('click');
        trB.trigger('click');
        await wrapperTable.vm.$nextTick();
        expect(secondTabOf(trDetailsB()).classes()).to.contains('is-active');

        trB.trigger('click');
        await wrapperTable.vm.$nextTick();

        firstTabLinkOf(trDetailsA()).trigger('click');
        trB.trigger('click');
        await wrapperTable.vm.$nextTick();
        expect(secondTabOf(trDetailsB()).classes()).to.contains('is-active');
    });

    it('remembers last active sub tab after parent tab is changed', async () => {
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 1 })));

        let wrapperTable = wrapper.find({ name: 'dashboard-table' });
        wrapperTable.vm.$forceUpdate();
        await wrapperTable.vm.$nextTick();
        let trA = wrapperTable.find('table tr.tracker-row:nth-child(1)');
        let trDetailsA = () => wrapperTable.findAll('tr.detail').at(0);
        let firstParentTabLinkOf = (trDetails) => trDetails.findAll('li a').at(0);
        let secondParentTabLinkOf = (trDetails) => trDetails.findAll('li a').at(1);
        let pathsSubTabOf = (trDetails) => trDetails.findAll('li').at(trDetails.findAll('li').length - 1);
        let pathsSubTabLinkOf = (trDetails) => trDetails.findAll('li a').at(trDetails.findAll('li').length - 1);

        trA.trigger('click');
        await wrapperTable.vm.$nextTick();

        pathsSubTabLinkOf(trDetailsA()).trigger('click');
        await wrapperTable.vm.$nextTick();
        expect(pathsSubTabOf(trDetailsA()).classes()).to.contains('is-active');

        secondParentTabLinkOf(trDetailsA()).trigger('click');
        await wrapperTable.vm.$nextTick();

        firstParentTabLinkOf(trDetailsA()).trigger('click');
        await wrapperTable.vm.$nextTick();
        expect(pathsSubTabOf(trDetailsA()).classes()).to.contains('is-active');
    });

    it('remembers last active sub tab of App', async () => {
        wrapper.vm.$store.commit('trackers/store', new Tracker(trackerFactory.create('meta', { id: 1 })));

        let wrapperTable = wrapper.find({ name: 'dashboard-table' });
        wrapperTable.vm.$forceUpdate();
        await wrapperTable.vm.$nextTick();
        let trA = wrapperTable.find('table tr.tracker-row:nth-child(1)');
        let trDetailsA = () => wrapperTable.findAll('tr.detail').at(0);
        let pathsSubTabOf = (trDetails) => trDetails.findAll('li').at(trDetails.findAll('li').length - 1);
        let pathsSubTabLinkOf = (trDetails) => trDetails.findAll('li a').at(trDetails.findAll('li').length - 1);

        trA.trigger('click');
        await wrapperTable.vm.$nextTick();

        pathsSubTabLinkOf(trDetailsA()).trigger('click');
        await wrapperTable.vm.$nextTick();
        expect(pathsSubTabOf(trDetailsA()).classes()).to.contains('is-active');

        trA.trigger('click');
        await wrapperTable.vm.$nextTick();

        trA.trigger('click');
        await wrapperTable.vm.$nextTick();
        expect(pathsSubTabOf(trDetailsA()).classes()).to.contains('is-active');
    });
});

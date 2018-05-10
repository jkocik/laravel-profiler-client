import Buefy from 'buefy';
import { createLocalVue, mount } from '@vue/test-utils';
import Tracker from '@/models/tracker';
import { storeFactory } from '@/store';
import DashboardFilter from '@/components/dashboard/DashboardFilter';
import { dummyTrackerData, dummyTrackerDataB } from './../../../../fixtures/es6';

describe('DashboardFilter Component', () => {
    let wrapper;
    let dummyTracker;
    let dummyTrackerB;

    beforeEach(() => {
        let localVue = createLocalVue();
        localVue.use(Buefy);

        wrapper = mount(DashboardFilter, {
            localVue,
            store: storeFactory(),
        });

        dummyTracker = new Tracker(dummyTrackerData);
        dummyTrackerB = new Tracker(dummyTrackerDataB);
    });

    it('running, env, typeGroup, statusGroup and method checkbox group items are all selected by default', (done) => {
        [
            dummyTracker,
            dummyTrackerB,
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('label.b-checkbox.is-info').length).to.equal(10);
            done();
        });
    });

    it('sees unique running checkbox group', (done) => {
        [
            Object.assign(new Tracker(dummyTrackerData), { running: 'console' }),
            Object.assign(new Tracker(dummyTrackerData), { running: 'console' }),
            Object.assign(new Tracker(dummyTrackerData), { running: 'web' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('input[value=console]').length).to.equal(1);
            expect(wrapper.findAll('input[value=web]').length).to.equal(1);
            done();
        });
    });

    it('running checkbox group is listed in ascending order', (done) => {
        [
            Object.assign(new Tracker(dummyTrackerData), { running: 'web' }),
            Object.assign(new Tracker(dummyTrackerData), { running: 'console' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            let inputs = wrapper.findAll('input');
            expect(inputs.at(1).attributes().value).to.equal('console');
            expect(inputs.at(2).attributes().value).to.equal('web');
            done();
        });
    });

    it('sees unique env checkbox group', (done) => {
        [
            Object.assign(new Tracker(dummyTrackerData), { env: 'localA' }),
            Object.assign(new Tracker(dummyTrackerData), { env: 'localA' }),
            Object.assign(new Tracker(dummyTrackerData), { env: 'localB' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('input[value=localA]').length).to.equal(1);
            expect(wrapper.findAll('input[value=localB]').length).to.equal(1);
            done();
        });
    });

    it('env checkbox group is listed in ascending order', (done) => {
        [
            Object.assign(new Tracker(dummyTrackerData), { env: 'localA' }),
            Object.assign(new Tracker(dummyTrackerData), { env: 'localC' }),
            Object.assign(new Tracker(dummyTrackerData), { env: 'localB' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            let inputs = wrapper.findAll('input[value^=local]');
            expect(inputs.at(0).attributes().value).to.equal('localA');
            expect(inputs.at(1).attributes().value).to.equal('localB');
            expect(inputs.at(2).attributes().value).to.equal('localC');
            done();
        });
    });

    it('sees unique typeGroup checkbox group', (done) => {
        [
            Object.assign(new Tracker(dummyTrackerData), { typeGroup: 'http' }),
            Object.assign(new Tracker(dummyTrackerData), { typeGroup: 'http' }),
            Object.assign(new Tracker(dummyTrackerData), { typeGroup: 'command' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('input[value=http]').length).to.equal(1);
            expect(wrapper.findAll('input[value=command]').length).to.equal(1);
            done();
        });
    });

    it('typeGroup checkbox group is listed in ascending order', (done) => {
        [
            Object.assign(new Tracker(dummyTrackerData), { typeGroup: 'http' }),
            Object.assign(new Tracker(dummyTrackerData), { typeGroup: 'command' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            let inputs = wrapper.findAll('input');
            expect(inputs.at(2).attributes().value).to.equal('command');
            expect(inputs.at(3).attributes().value).to.equal('http');
            done();
        });
    });

    it('sees unique statusGroup checkbox group', (done) => {
        [
            Object.assign(new Tracker(dummyTrackerData), { statusGroup: '2xx' }),
            Object.assign(new Tracker(dummyTrackerData), { statusGroup: '2xx' }),
            Object.assign(new Tracker(dummyTrackerData), { statusGroup: '3xx' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('input[value="2xx"]').length).to.equal(1);
            expect(wrapper.findAll('input[value="3xx"]').length).to.equal(1);
            done();
        });
    });

    it('statusGroup checkbox group is listed in ascending order', (done) => {
        [
            Object.assign(new Tracker(dummyTrackerData), { statusGroup: '3xx' }),
            Object.assign(new Tracker(dummyTrackerData), { statusGroup: '2xx' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            let inputs = wrapper.findAll('input');
            expect(inputs.at(3).attributes().value).to.equal('2xx');
            expect(inputs.at(4).attributes().value).to.equal('3xx');
            done();
        });
    });

    it('sees unique method checkbox group', (done) => {
        [
            Object.assign(new Tracker(dummyTrackerData), { method: 'GET' }),
            Object.assign(new Tracker(dummyTrackerData), { method: 'GET' }),
            Object.assign(new Tracker(dummyTrackerData), { method: 'POST' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('input[value=GET]').length).to.equal(1);
            expect(wrapper.findAll('input[value=POST]').length).to.equal(1);
            done();
        });
    });

    it('method checkbox group is listed in ascending order', (done) => {
        [
            Object.assign(new Tracker(dummyTrackerData), { method: 'POST' }),
            Object.assign(new Tracker(dummyTrackerData), { method: 'GET' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            let inputs = wrapper.findAll('input');
            expect(inputs.at(4).attributes().value).to.equal('GET');
            expect(inputs.at(5).attributes().value).to.equal('POST');
            done();
        });
    });
});

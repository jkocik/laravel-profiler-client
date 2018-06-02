import Tracker from '@/models/tracker';
import DashboardFilter from '@/components/dashboard/DashboardFilter';
import { trackerFactory, mountWithoutProps } from './../../test-helper';

describe('DashboardFilter Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mountWithoutProps(DashboardFilter);
    });

    it('running, env, typeGroup, statusGroup and method checkbox group items are all selected by default', async () => {
        [
            new Tracker(trackerFactory.create()),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        await wrapper.vm.$nextTick();
        expect(wrapper.findAll('label.b-checkbox.is-info').length).to.equal(5);
    });

    it('sees unique running checkbox group', async () => {
        [
            new Tracker(trackerFactory.create('meta', { is_running_in_console: true })),
            new Tracker(trackerFactory.create('meta', { is_running_in_console: true })),
            new Tracker(trackerFactory.create('meta', { is_running_in_console: false })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        await wrapper.vm.$nextTick();
        expect(wrapper.findAll('input[value=console]').length).to.equal(1);
        expect(wrapper.findAll('input[value=web]').length).to.equal(1);
    });

    it('running checkbox group is listed in ascending order', async () => {
        [
            new Tracker(trackerFactory.create('meta', { is_running_in_console: true })),
            new Tracker(trackerFactory.create('meta', { is_running_in_console: false })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        await wrapper.vm.$nextTick();
        let inputs = wrapper.findAll('input');
        expect(inputs.at(1).attributes().value).to.equal('console');
        expect(inputs.at(2).attributes().value).to.equal('web');
    });

    it('sees unique env checkbox group', async () => {
        [
            new Tracker(trackerFactory.create('meta', { env: 'localA' })),
            new Tracker(trackerFactory.create('meta', { env: 'localA' })),
            new Tracker(trackerFactory.create('meta', { env: 'localB' })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        await wrapper.vm.$nextTick();
        expect(wrapper.findAll('input[value=localA]').length).to.equal(1);
        expect(wrapper.findAll('input[value=localB]').length).to.equal(1);
    });

    it('env checkbox group is listed in ascending order', async () => {
        [
            new Tracker(trackerFactory.create('meta', { env: 'localA' })),
            new Tracker(trackerFactory.create('meta', { env: 'localC' })),
            new Tracker(trackerFactory.create('meta', { env: 'localB' })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        await wrapper.vm.$nextTick();
        let inputs = wrapper.findAll('input[value^=local]');
        expect(inputs.at(0).attributes().value).to.equal('localA');
        expect(inputs.at(1).attributes().value).to.equal('localB');
        expect(inputs.at(2).attributes().value).to.equal('localC');
    });

    it('sees unique typeGroup checkbox group', async () => {
        [
            new Tracker(trackerFactory.create('meta', { type: 'http' })),
            new Tracker(trackerFactory.create('meta', { type: 'http' })),
            new Tracker(trackerFactory.create('meta', { type: 'command-finished' })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        await wrapper.vm.$nextTick();
        expect(wrapper.findAll('input[value=http]').length).to.equal(1);
        expect(wrapper.findAll('input[value=command]').length).to.equal(1);
    });

    it('typeGroup checkbox group is listed in ascending order', async () => {
        [
            new Tracker(trackerFactory.create('meta', { type: 'http' })),
            new Tracker(trackerFactory.create('meta', { type: 'command-finished' })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        await wrapper.vm.$nextTick();
        let inputs = wrapper.findAll('input');
        expect(inputs.at(2).attributes().value).to.equal('command');
        expect(inputs.at(3).attributes().value).to.equal('http');
    });

    it('sees unique statusGroup checkbox group', async () => {
        [
            new Tracker(trackerFactory.create('meta', { status: 201 })),
            new Tracker(trackerFactory.create('meta', { status: 201 })),
            new Tracker(trackerFactory.create('meta', { status: 301 })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        await wrapper.vm.$nextTick();
        expect(wrapper.findAll('input[value="2xx"]').length).to.equal(1);
        expect(wrapper.findAll('input[value="3xx"]').length).to.equal(1);
    });

    it('statusGroup checkbox group is listed in ascending order', async () => {
        [
            new Tracker(trackerFactory.create('meta', { status: 301 })),
            new Tracker(trackerFactory.create('meta', { status: 201 })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        await wrapper.vm.$nextTick();
        let inputs = wrapper.findAll('input');
        expect(inputs.at(3).attributes().value).to.equal('2xx');
        expect(inputs.at(4).attributes().value).to.equal('3xx');
    });

    it('sees unique method checkbox group', async () => {
        [
            new Tracker(trackerFactory.create('meta', { method: 'GET' })),
            new Tracker(trackerFactory.create('meta', { method: 'GET' })),
            new Tracker(trackerFactory.create('meta', { method: 'POST' })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        await wrapper.vm.$nextTick();
        expect(wrapper.findAll('input[value=GET]').length).to.equal(1);
        expect(wrapper.findAll('input[value=POST]').length).to.equal(1);
    });

    it('method checkbox group is listed in ascending order', async () => {
        [
            new Tracker(trackerFactory.create('meta', { method: 'POST' })),
            new Tracker(trackerFactory.create('meta', { method: 'GET' })),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        await wrapper.vm.$nextTick();
        let inputs = wrapper.findAll('input');
        expect(inputs.at(4).attributes().value).to.equal('GET');
        expect(inputs.at(5).attributes().value).to.equal('POST');
    });
});

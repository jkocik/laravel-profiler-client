import Buefy from 'buefy';
import { createLocalVue, mount } from '@vue/test-utils';
import { storeFactory } from '@/store';
import HeaderFilter from '@/components/dashboard/HeaderFilter';
import { dummyTracker, dummyTrackerB } from './../../../../fixtures/es6';

describe('HeaderFilter Component', () => {
    let wrapper;

    beforeEach(() => {
        let localVue = createLocalVue();
        localVue.use(Buefy);

        wrapper = mount(HeaderFilter, {
            localVue,
            store: storeFactory(),
        });
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
            Object.assign({}, dummyTracker, { running: 'console' }),
            Object.assign({}, dummyTracker, { running: 'console' }),
            Object.assign({}, dummyTracker, { running: 'web' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('input[value=console]').length).to.equal(1);
            expect(wrapper.findAll('input[value=web]').length).to.equal(1);
            done();
        });
    });

    it('running checkbox group is listed in ascending order', (done) => {
        [
            Object.assign({}, dummyTracker, { running: 'web' }),
            Object.assign({}, dummyTracker, { running: 'console' }),
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
            Object.assign({}, dummyTracker, { env: 'localA' }),
            Object.assign({}, dummyTracker, { env: 'localA' }),
            Object.assign({}, dummyTracker, { env: 'localB' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('input[value=localA]').length).to.equal(1);
            expect(wrapper.findAll('input[value=localB]').length).to.equal(1);
            done();
        });
    });

    it('env checkbox group is listed in ascending order', (done) => {
        [
            Object.assign({}, dummyTracker, { env: 'localA' }),
            Object.assign({}, dummyTracker, { env: 'localC' }),
            Object.assign({}, dummyTracker, { env: 'localB' }),
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
            Object.assign({}, dummyTracker, { typeGroup: 'http' }),
            Object.assign({}, dummyTracker, { typeGroup: 'http' }),
            Object.assign({}, dummyTracker, { typeGroup: 'command' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('input[value=http]').length).to.equal(1);
            expect(wrapper.findAll('input[value=command]').length).to.equal(1);
            done();
        });
    });

    it('typeGroup checkbox group is listed in ascending order', (done) => {
        [
            Object.assign({}, dummyTracker, { typeGroup: 'http' }),
            Object.assign({}, dummyTracker, { typeGroup: 'command' }),
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
            Object.assign({}, dummyTracker, { statusGroup: '2xx' }),
            Object.assign({}, dummyTracker, { statusGroup: '2xx' }),
            Object.assign({}, dummyTracker, { statusGroup: '3xx' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('input[value="2xx"]').length).to.equal(1);
            expect(wrapper.findAll('input[value="3xx"]').length).to.equal(1);
            done();
        });
    });

    it('statusGroup checkbox group is listed in ascending order', (done) => {
        [
            Object.assign({}, dummyTracker, { statusGroup: '3xx' }),
            Object.assign({}, dummyTracker, { statusGroup: '2xx' }),
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
            Object.assign({}, dummyTracker, { method: 'GET' }),
            Object.assign({}, dummyTracker, { method: 'GET' }),
            Object.assign({}, dummyTracker, { method: 'POST' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('input[value=GET]').length).to.equal(1);
            expect(wrapper.findAll('input[value=POST]').length).to.equal(1);
            done();
        });
    });

    it('method checkbox group is listed in ascending order', (done) => {
        [
            Object.assign({}, dummyTracker, { method: 'POST' }),
            Object.assign({}, dummyTracker, { method: 'GET' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            let inputs = wrapper.findAll('input');
            expect(inputs.at(4).attributes().value).to.equal('GET');
            expect(inputs.at(5).attributes().value).to.equal('POST');
            done();
        });
    });
});

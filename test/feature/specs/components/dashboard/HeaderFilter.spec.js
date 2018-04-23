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

    it('env and version checkbox group items are all selected by default', (done) => {
        [
            dummyTracker,
            dummyTrackerB,
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('label.b-checkbox.is-primary').length).to.equal(4);
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

    it('sees unique version checkbox group', (done) => {
        [
            Object.assign({}, dummyTracker, { version: '5.6.0' }),
            Object.assign({}, dummyTracker, { version: '5.6.0' }),
            Object.assign({}, dummyTracker, { version: '5.5.0' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('input[value="5.6.0"]').length).to.equal(1);
            expect(wrapper.findAll('input[value="5.5.0"]').length).to.equal(1);
            done();
        });
    });

    it('version checkbox group is listed in ascending order', (done) => {
        [
            Object.assign({}, dummyTracker, { version: '5.4.0' }),
            Object.assign({}, dummyTracker, { version: '5.6.0' }),
            Object.assign({}, dummyTracker, { version: '5.5.0' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            let inputs = wrapper.findAll('input[value^="5."]');
            expect(inputs.at(0).attributes().value).to.equal('5.4.0');
            expect(inputs.at(1).attributes().value).to.equal('5.5.0');
            expect(inputs.at(2).attributes().value).to.equal('5.6.0');
            done();
        });
    });
});

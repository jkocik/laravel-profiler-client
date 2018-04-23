import Buefy from 'buefy';
import { createLocalVue, mount } from '@vue/test-utils';
import { storeFactory } from '@/store';
import { dummyTracker } from './../../../../fixtures/es6';
import HeaderFilter from '@/components/dashboard/HeaderFilter';

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

    it('env checkbox group has all items selected', (done) => {
        [
            Object.assign({}, dummyTracker, { env: 'localA' }),
            Object.assign({}, dummyTracker, { env: 'localB' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('label.b-checkbox.is-primary').length).to.equal(2);
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
});

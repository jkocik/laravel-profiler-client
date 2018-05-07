import Buefy from 'buefy';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import { storeFactory } from '@/store';
import AppDashboard from '@/components/AppDashboard';
import { dummyTracker, dummyTrackerB } from './../../../fixtures/es6';

describe('AppDashboard Component', () => {
    let wrapper;

    beforeEach(() => {
        let localVue = createLocalVue();
        localVue.use(Buefy);

        wrapper = mount(AppDashboard, {
            localVue,
            store: storeFactory(),
            i18n,
        });
    });

    it('sees meta data of profiler after data are delivered', (done) => {
        expect(wrapper.find('p').text()).to.contain(wrapper.vm.$t('message.dashboard.trackers-list-is-empty'));

        wrapper.vm.$store.commit('trackers/store', dummyTracker);

        wrapper.vm.$forceUpdate();
        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('p').exists()).to.be.false;
            expect(wrapper.vm.$store.state.trackers.all).to.have.lengthOf(1);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(2)').text()).to.contain(dummyTracker.executionAt);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(3)').text()).to.contain(dummyTracker.env);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(4)').text()).to.contain(dummyTracker.running);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(5)').text()).to.contain(dummyTracker.type);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(6)').text()).to.contain(dummyTracker.method);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(6)').text()).to.contain(dummyTracker.status);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(6)').text()).to.contain(dummyTracker.path);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(7)').text()).to.contain(dummyTracker.laravel_version);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(7)').text()).to.contain(dummyTracker.php_version);
            done();
        });
    });

    it('sees meta data of profiler in descending order', (done) => {
        wrapper.vm.$store.commit('trackers/store', dummyTracker);
        wrapper.vm.$store.commit('trackers/store', dummyTrackerB);

        wrapper.vm.$forceUpdate();
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.$store.state.trackers.all).to.have.lengthOf(2);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(3)').text()).to.contain(dummyTrackerB.env);
            expect(wrapper.find('table tr:nth-child(1) td:nth-child(4)').text()).to.contain(dummyTrackerB.running);
            expect(wrapper.find('table tr:nth-child(2) td:nth-child(3)').text()).to.contain(dummyTracker.env);
            expect(wrapper.find('table tr:nth-child(2) td:nth-child(4)').text()).to.contain(dummyTracker.running);
            done();
        });
    });

    it('sees meta data of profiler paginated', (done) => {
        [
            Object.assign({}, dummyTracker, { env: 'localA' }),
            Object.assign({}, dummyTracker, { env: 'localB' }),
            Object.assign({}, dummyTracker, { env: 'localC' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.setData({ perPage: 2 });

        wrapper.vm.$forceUpdate();
        wrapper.vm.$children.forEach(child => child.$children.forEach(subChild => subChild.$forceUpdate()));
        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('table').text()).to.contain('localC');
            expect(wrapper.find('table').text()).to.contain('localB');
            expect(wrapper.find('table').text()).to.not.contain('localA');
            expect(wrapper.findAll('.pagination-link').length).to.equal(2);
            done();
        });
    });

    it('shows 15 items per page by default', () => {
        expect(wrapper.vm.perPage).to.equal(15);
    });

    it('filters profilers by running', (done) => {
        [
            Object.assign({}, dummyTracker, { running: 'console' }),
            Object.assign({}, dummyTracker, { running: 'web' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.setData({ perPage: 1 });

        wrapper.vm.$forceUpdate();
        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('table').text()).to.contain('web');
            expect(wrapper.find('table').text()).to.not.contain('console');

            wrapper.vm.$store.commit('trackers/updateFilter', { running: [ 'console' ] });

            wrapper.vm.$forceUpdate();
            wrapper.vm.$nextTick(() => {
                expect(wrapper.find('table').text()).to.contain('console');
                expect(wrapper.find('table').text()).to.not.contain('web');
                done();
            });
        });
    });

    it('filters profilers by env', (done) => {
        [
            Object.assign({}, dummyTracker, { env: 'localA' }),
            Object.assign({}, dummyTracker, { env: 'localB' }),
            Object.assign({}, dummyTracker, { env: 'localC' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.setData({ perPage: 2 });

        wrapper.vm.$forceUpdate();
        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('table').text()).to.contain('localC');
            expect(wrapper.find('table').text()).to.contain('localB');
            expect(wrapper.find('table').text()).to.not.contain('localA');

            wrapper.vm.$store.commit('trackers/updateFilter', { env: [ 'localC', 'localA' ] });

            wrapper.vm.$forceUpdate();
            wrapper.vm.$nextTick(() => {
                expect(wrapper.find('table').text()).to.contain('localC');
                expect(wrapper.find('table').text()).to.not.contain('localB');
                expect(wrapper.find('table').text()).to.contain('localA');
                done();
            });
        });
    });

    it('filters profilers by type', (done) => {
        [
            Object.assign({}, dummyTracker, { type: 'command', typeGroup: 'command' }),
            Object.assign({}, dummyTracker, { type: 'http / ajax', typeGroup: 'http' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.setData({ perPage: 1 });

        wrapper.vm.$forceUpdate();
        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('table').text()).to.contain('http ');
            expect(wrapper.find('table').text()).to.not.contain('command');

            wrapper.vm.$store.commit('trackers/updateFilter', { typeGroup: [ 'command' ] });

            wrapper.vm.$forceUpdate();
            wrapper.vm.$nextTick(() => {
                expect(wrapper.find('table').text()).to.contain('command');
                expect(wrapper.find('table').text()).to.not.contain('http');
                done();
            });
        });
    });

    it('filters profilers by statusGroup', (done) => {
        [
            Object.assign({}, dummyTracker, { status: 201, statusGroup: '2xx' }),
            Object.assign({}, dummyTracker, { status: 301, statusGroup: '3xx' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.setData({ perPage: 1 });

        wrapper.vm.$forceUpdate();
        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('table').text()).to.contain('301');
            expect(wrapper.find('table').text()).to.not.contain('201');

            wrapper.vm.$store.commit('trackers/updateFilter', { statusGroup: [ '2xx' ] });

            wrapper.vm.$forceUpdate();
            wrapper.vm.$nextTick(() => {
                expect(wrapper.find('table').text()).to.contain('201');
                expect(wrapper.find('table').text()).to.not.contain('301');
                done();
            });
        });
    });

    it('filters profilers by method', (done) => {
        [
            Object.assign({}, dummyTracker, { method: 'GET' }),
            Object.assign({}, dummyTracker, { method: 'POST' }),
        ].forEach(tracker => wrapper.vm.$store.commit('trackers/store', tracker));

        wrapper.setData({ perPage: 1 });

        wrapper.vm.$forceUpdate();
        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('table').text()).to.contain('POST');
            expect(wrapper.find('table').text()).to.not.contain('GET');

            wrapper.vm.$store.commit('trackers/updateFilter', { method: [ 'GET' ] });

            wrapper.vm.$forceUpdate();
            wrapper.vm.$nextTick(() => {
                expect(wrapper.find('table').text()).to.contain('GET');
                expect(wrapper.find('table').text()).to.not.contain('POST');
                done();
            });
        });
    });

    it('toggles visibility of row details', (done) => {
        wrapper.vm.$store.commit('trackers/store', dummyTracker);
        wrapper.vm.$store.commit('trackers/store', dummyTrackerB);

        wrapper.vm.$forceUpdate();
        wrapper.vm.$nextTick(() => {
            let tr = wrapper.find('table tr:nth-child(1)');
            tr.trigger('click');
            expect(wrapper.find('table tr:nth-child(1) + tr.detail').exists()).to.be.true;
            expect(wrapper.find('table tr:nth-child(1) + tr.detail').isVisible()).to.be.true;
            expect(wrapper.find('table tr:nth-child(1) + tr.detail td').attributes().colspan).to.equal('6');
            tr.trigger('click');
            expect(wrapper.find('table tr:nth-child(1) + tr.detail').exists()).to.be.false;
            done();
        });
    });
});

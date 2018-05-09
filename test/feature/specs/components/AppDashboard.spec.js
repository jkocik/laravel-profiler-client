import Buefy from 'buefy';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import { storeFactory } from '@/store';
import AppDashboard from '@/components/AppDashboard';
import { dummyTrackerData, dummyTrackerDataB } from './../../../fixtures/es6';

describe('AppDashboard Component', () => {
    let wrapper;
    let dummyTracker;
    let dummyTrackerB;

    beforeEach(() => {
        let localVue = createLocalVue();
        localVue.use(Buefy);

        wrapper = mount(AppDashboard, {
            localVue,
            store: storeFactory(),
            i18n,
        });

        dummyTracker = new Tracker(dummyTrackerData);
        dummyTrackerB = new Tracker(dummyTrackerDataB);
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
            let trDetailsA = wrapper.find('table tr:nth-child(1) + tr.detail');
            expect(trDetailsA.exists()).to.be.true;
            expect(trDetailsA.isVisible()).to.be.true;
            expect(trDetailsA.find('td').attributes().colspan).to.equal('6');

            tr.trigger('click');
            let trDetailsABis = wrapper.find('table tr:nth-child(1) + tr.detail');
            expect(trDetailsABis.exists()).to.be.false;

            done();
        });
    });

    it('remembers last active tab of any details row and uses it when new details are opened to activate the same tab', (done) => {
        wrapper.vm.$store.commit('trackers/store', dummyTracker);
        wrapper.vm.$store.commit('trackers/store', dummyTrackerB);

        wrapper.vm.$forceUpdate();
        wrapper.vm.$nextTick(() => {
            let trA = wrapper.find('table tr.tracker-row:nth-child(1)');
            let trB = wrapper.find('table tr.tracker-row:nth-child(2)');
            let trDetailsA = () => wrapper.findAll('tr.detail').at(0);
            let trDetailsB = () => wrapper.findAll('tr.detail').at(1);
            let firstTabOf = (trDetails) => trDetails.findAll('li').at(0);
            let secondTabOf = (trDetails) => trDetails.findAll('li').at(1);
            let firstTabLinkOf = (trDetails) => trDetails.findAll('li a').at(0);
            let secondTabLinkOf = (trDetails) => trDetails.findAll('li a').at(1);

            trA.trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(firstTabOf(trDetailsA()).classes()).to.contains('is-active');
                expect(secondTabOf(trDetailsA()).classes()).to.not.contains('is-active');

                secondTabLinkOf(trDetailsA()).trigger('click');
                wrapper.vm.$nextTick(() => {
                    expect(firstTabOf(trDetailsA()).classes()).to.not.contains('is-active');
                    expect(secondTabOf(trDetailsA()).classes()).to.contains('is-active');

                    trB.trigger('click');
                    wrapper.vm.$nextTick(() => {
                        expect(firstTabOf(trDetailsB()).classes()).to.not.contains('is-active');
                        expect(secondTabOf(trDetailsB()).classes()).to.contains('is-active');

                        firstTabLinkOf(trDetailsB()).trigger('click');
                        wrapper.vm.$nextTick(() => {
                            expect(firstTabOf(trDetailsA()).classes()).to.not.contains('is-active');
                            expect(secondTabOf(trDetailsA()).classes()).to.contains('is-active');
                            expect(firstTabOf(trDetailsB()).classes()).to.contains('is-active');
                            expect(secondTabOf(trDetailsB()).classes()).to.not.contains('is-active');
                            done();
                        });
                    });
                });
            });
        });
    });

    it('remembers last time changed tab when reopen particular details', (done) => {
        wrapper.vm.$store.commit('trackers/store', dummyTracker);
        wrapper.vm.$store.commit('trackers/store', dummyTrackerB);

        wrapper.vm.$forceUpdate();
        wrapper.vm.$nextTick(() => {
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
            wrapper.vm.$nextTick(() => {
                secondTabLinkOf(trDetailsB()).trigger('click');
                firstTabLinkOf(trDetailsA()).trigger('click');

                wrapper.vm.$nextTick(() => {
                    trB.trigger('click');

                    wrapper.vm.$nextTick(() => {
                        trB.trigger('click');

                        wrapper.vm.$nextTick(() => {
                            expect(firstTabOf(trDetailsA()).classes()).to.contains('is-active');
                            expect(secondTabOf(trDetailsB()).classes()).to.contains('is-active');
                            done();
                        });
                    });
                });
            });
        });
    });

    it('remembers last time active tab when reopen particular details even it was set by default and not changed', (done) => {
        wrapper.vm.$store.commit('trackers/store', dummyTracker);
        wrapper.vm.$store.commit('trackers/store', dummyTrackerB);

        wrapper.vm.$forceUpdate();
        wrapper.vm.$nextTick(() => {
            let trA = wrapper.find('table tr.tracker-row:nth-child(1)');
            let trB = wrapper.find('table tr.tracker-row:nth-child(2)');
            let trDetailsA = () => wrapper.findAll('tr.detail').at(0);
            let trDetailsB = () => wrapper.findAll('tr.detail').at(1);
            let secondTabOf = (trDetails) => trDetails.findAll('li').at(1);
            let firstTabLinkOf = (trDetails) => trDetails.findAll('li a').at(0);
            let secondTabLinkOf = (trDetails) => trDetails.findAll('li a').at(1);

            trA.trigger('click');
            wrapper.vm.$nextTick(() => {
                secondTabLinkOf(trDetailsA()).trigger('click');
                trB.trigger('click');

                wrapper.vm.$nextTick(() => {
                    expect(secondTabOf(trDetailsB()).classes()).to.contains('is-active');
                    trB.trigger('click');

                    wrapper.vm.$nextTick(() => {
                        firstTabLinkOf(trDetailsA()).trigger('click');
                        trB.trigger('click');

                        wrapper.vm.$nextTick(() => {
                            expect(secondTabOf(trDetailsB()).classes()).to.contains('is-active');
                            done();
                        });
                    });
                });
            });
        });
    });
});

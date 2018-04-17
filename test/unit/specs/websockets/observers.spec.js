import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import { SocketIO, Server } from 'mock-socket';
import { storeFactory } from '@/store';
import { observersFactory } from '@/websockets/observers';
import { dummyTrackerData, dummyTracker } from './../../fixtures/trackers';

describe('Websockets Observers', () => {
    it('stores tracker received from server', () => {
        let server = new Server('http://localhost:1901');
        Vue.use(VueSocketio, SocketIO('http://localhost:1901'));

        let vue = new Vue({ store: storeFactory() });
        observersFactory(vue);

        server.emit('laravel-profiler-broadcasting', dummyTrackerData);

        expect(vue.$store.state.trackers.all[0]).to.deep.equal(dummyTracker);
    });
});

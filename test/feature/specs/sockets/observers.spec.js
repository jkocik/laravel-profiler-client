import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import { SocketIO, Server } from 'mock-socket';
import { storeFactory } from '@/store';
import Tracker from '@/models/tracker';
import { observersInit } from '@/sockets/observers';
import { dummyTrackerData, dummyTracker } from './../../../fixtures/es6';

describe('Sockets Observers', () => {
    it('stores tracker received from server', () => {
        let server = new Server('http://localhost:1901');
        Vue.use(VueSocketio, SocketIO('http://localhost:1901'));

        let vue = new Vue({ store: storeFactory() });
        observersInit(vue);

        server.emit('laravel-profiler-broadcasting', dummyTrackerData);

        expect(vue.$store.state.trackers.all[0]).to.be.instanceOf(Tracker);
        expect(vue.$store.state.trackers.all[0]).to.deep.equal(dummyTracker);
    });
});

import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import { SocketIO, Server } from 'mock-socket';
import Tracker from '@/models/tracker';
import { storeFactory } from '@/store';
import { trackerFactory } from './../test-helper';
import { observersInit } from '@/sockets/observers';

describe('Sockets Observers', () => {
    it('stores tracker received from server', () => {
        let server = new Server('http://localhost:1901');
        Vue.use(VueSocketio, SocketIO('http://localhost:1901'));

        let vue = new Vue({ store: storeFactory() });
        observersInit(vue);

        let trackerSource = trackerFactory.create();
        server.emit('laravel-profiler-broadcasting', trackerSource);

        expect(vue.$store.state.trackers.all[0]).to.be.instanceOf(Tracker);
        expect(vue.$store.state.trackers.all[0]).to.deep.equal(new Tracker(trackerSource));
    });
});

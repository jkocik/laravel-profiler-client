import Vue from 'vue';
import { SocketIO, Server } from 'mock-socket';
import Tracker from '@/models/tracker';
import { storeFactory } from '@/store';
import { Socket } from '@/sockets/socket';
import VueSocket from '@/sockets/vue-socket';
import { trackerFactory } from './../test-helper';

describe('Socket', () => {
    it('can connect to server', (done) => {
        let server = new Server('http://localhost:1991');
        let socket = new Socket(SocketIO);

        socket.connect('http://localhost:1991');

        server.on('connection', () => {
            server.stop(done);
        });
    });

    it('stores tracker received from server', () => {
        let server = new Server('http://localhost:1991');
        let store = storeFactory();

        Vue.use(VueSocket, { io: SocketIO, store });
        let vue = new Vue({ store });

        vue.$socket.connect('http://localhost:1991');

        let trackerSource = trackerFactory.create();
        server.emit('laravel-profiler-broadcasting', trackerSource);

        expect(vue.$store.state.trackers.all[0]).to.be.instanceOf(Tracker);
        expect(vue.$store.state.trackers.all[0]).to.deep.equal(new Tracker(trackerSource));
        server.stop();
    });
});

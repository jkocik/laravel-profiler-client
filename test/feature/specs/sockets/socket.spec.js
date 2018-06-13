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
        let store = storeFactory();
        store.commit('sockets/updateUrl', 'http://localhost:1991');

        /* eslint-disable no-new */
        new Socket(SocketIO, store);

        server.on('connection', () => {
            server.stop(done);
        });
    });

    it('disconnects old connection when connecting', (done) => {
        let serverA = new Server('http://localhost:1991');
        let serverB = new Server('http://localhost:1999');
        let store = storeFactory();
        store.commit('sockets/updateUrl', 'http://localhost:1991');

        let socket = new Socket(SocketIO, store);
        let socketDisconnect = sinon.spy(socket, 'disconnect');

        socket.connect('http://localhost:1999');

        serverB.on('connection', () => {
            expect(socketDisconnect.calledOnce).to.be.true;
            socket.disconnect.restore();

            serverA.stop();
            serverB.stop(done);
        });
    });

    it('stores tracker received from server', () => {
        let server = new Server('http://localhost:1991');
        let store = storeFactory();
        store.commit('sockets/updateUrl', 'http://localhost:1991');

        Vue.use(VueSocket, { io: SocketIO, store });
        let vue = new Vue({ store });

        let trackerSource = trackerFactory.create();
        server.emit('laravel-profiler-broadcasting', trackerSource);

        expect(vue.$store.state.trackers.all[0]).to.be.instanceOf(Tracker);
        expect(vue.$store.state.trackers.all[0]).to.deep.equal(new Tracker(trackerSource));
        server.stop();
    });
});

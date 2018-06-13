import Tracker from '@/models/tracker';

export class Socket {
    constructor(io, store) {
        this.io = io;
        this.store = store;
        this.socket = null;

        this.connect(store.state.sockets.url);
    }

    connect(url) {
        this.disconnect();
        this.socket = this.io(url);
        this.initObservers(url);
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    initObservers(url) {
        this.socket.on('laravel-profiler-broadcasting', (data) => {
            this.store.commit('trackers/store', new Tracker(data));
        });

        this.socket.on('connect', () => {
            this.store.commit('sockets/updateConnected', true);
            this.store.commit('sockets/updateUrl', url);
        });

        this.socket.on('disconnect', () => {
            this.store.commit('sockets/updateConnected', false);
        });

        this.socket.on('connect_error', () => {
            this.store.commit('sockets/incrementConnectErrorCount');
        });
    }
}

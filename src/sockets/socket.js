import Tracker from '@/models/tracker';

export class Socket {
    constructor(io, store) {
        this.io = io;
        this.store = store;
        this.socket = null;
    }

    connect(url) {
        this.socket = this.io(url);
        this.initObservers();
    }

    initObservers() {
        this.socket.on('laravel-profiler-broadcasting', (data) => {
            this.store.commit('trackers/store', new Tracker(data));
        });
    }
}

import Tracker from './../models/tracker';

export function observersFactory(vue) {
    vue.$socket.on('laravel-profiler-broadcasting', data => {
        vue.$store.commit('trackers/store', new Tracker(data));
    });
}

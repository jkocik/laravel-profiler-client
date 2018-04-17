import Tracker from './../models/tracker';

export function observersInit(vue) {
    vue.$socket.on('laravel-profiler-broadcasting', data => {
        vue.$store.commit('trackers/store', new Tracker(data));
    });
}

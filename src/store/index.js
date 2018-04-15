import Vue from 'vue';
import Vuex from 'vuex';
import env from './../env';
import trackers from './modules/trackers';

Vue.use(Vuex);

export function storeFactory() {
    const strict = env.nodeEnv !== 'production';

    return new Vuex.Store({
        modules: {
            trackers,
        },
        strict,
    });
}

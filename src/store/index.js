import Vue from 'vue';
import Vuex from 'vuex';
import trackers from './modules/trackers';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        trackers,
    },
});

import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import { observersInit } from './observers';

export default {
    connect() {
        Vue.use(VueSocketio, 'http://localhost:1901');
    },
    observersInit(vue) {
        observersInit(vue);
    },
};

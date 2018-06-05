import Vue from 'vue';
import Buefy from 'buefy';
import io from 'socket.io-client';
import TreeView from 'vue-json-tree-view';
import 'buefy/lib/buefy.css';
/* eslint-disable */
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import brands from '@fortawesome/fontawesome-free-brands';
/* eslint-enable */
import App from './App';
import i18n from './i18n';
import store from './store';
import router from './router';
import VueSocket from './sockets/vue-socket';

Vue.config.productionTip = false;
Vue.use(Buefy);
Vue.use(TreeView);
Vue.use(VueSocket, { io, store });

const vue = new Vue({
    el: '#app',
    i18n,
    store,
    router,
    render: h => h(App),
});

vue.$socket.connect('http://localhost:1901');

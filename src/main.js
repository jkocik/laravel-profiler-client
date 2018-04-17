import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import sockets from './sockets';

Vue.config.productionTip = false;

sockets.connect();

const vue = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});

sockets.observersInit(vue);

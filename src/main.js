import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';
import App from './App';
import i18n from './i18n';
import store from './store';
import router from './router';
import sockets from './sockets';

Vue.config.productionTip = false;
Vue.use(Buefy);

sockets.connect();

const vue = new Vue({
    el: '#app',
    i18n,
    store,
    router,
    render: h => h(App),
});

sockets.observersInit(vue);

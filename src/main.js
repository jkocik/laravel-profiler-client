import Vue from 'vue';
import App from './App';
import router from './router';
import { storeFactory } from './store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store: storeFactory(),
    render: h => h(App),
});

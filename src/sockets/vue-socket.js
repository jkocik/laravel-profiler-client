import { Socket } from './socket';

export default {
    install(Vue, { io, store }) {
        Vue.prototype.$socket = new Socket(io, store);
    },
};

import { Socket } from './socket';

export default {
    install(Vue, { io, store }) {
        const socket = new Socket(io, store);

        Object.defineProperty(Vue.prototype, '$socket', {
            get() {
                return socket;
            },
        });
    },
};

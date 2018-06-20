import Buefy from 'buefy';
import VueRouter from 'vue-router';
import { SocketIO } from 'mock-socket';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import { storeFactory } from '@/store';
import VueSocket from '@/sockets/vue-socket';
import VueTreeView from '@/tree-view/vue-tree-view';
import { Factory } from './test-factories/src/factory';
import { dummyTrackerData } from './../../fixtures/es6';

export const trackerFactory = new Factory(dummyTrackerData);

export const bindingsFactory = new Factory(dummyTrackerData.data.bindings[0]);

export const mountWithTracker = (component, tracker) => {
    let localVue = createLocalVue();
    localVue.use(Buefy);
    localVue.use(VueTreeView);

    let store = storeFactory();
    store.commit('trackers/store', tracker);

    let wrapper = mount(component, {
        localVue,
        i18n,
        store,
        propsData: {
            tracker,
        },
    });

    extend(wrapper);

    return wrapper;
};

export const mountWithoutProps = (component) => {
    let localVue = createLocalVue();
    localVue.use(Buefy);
    localVue.use(VueRouter);
    localVue.use(VueTreeView);

    let store = storeFactory();
    let router = emptyRouter();

    let wrapper = mount(component, {
        localVue,
        i18n,
        store,
        router,
    });

    extend(wrapper);

    return wrapper;
};

export const mountWithSocketMock = (component, url) => {
    let localVue = createLocalVue();
    localVue.use(Buefy);
    localVue.use(VueRouter);
    localVue.use(VueTreeView);

    let store = storeFactory();
    let router = emptyRouter();

    store.commit('sockets/updateUrl', url);
    localVue.use(VueSocket, { io: SocketIO, store });

    let wrapper = mount(component, {
        localVue,
        i18n,
        store,
        router,
    });

    extend(wrapper);

    return wrapper;
};

const extend = (wrapper) => {
    wrapper.tabs = (index) => wrapper.findAll('.tabs li').at(index);
    wrapper.trs = (index) => wrapper.findAll('tr').at(index);
    wrapper.lis = (index) => wrapper.findAll('li').at(index);
};

const emptyRouter = () => {
    return new VueRouter({
        routes: [],
    });
};

import Buefy from 'buefy';
import TreeView from 'vue-json-tree-view';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import { storeFactory } from '@/store';
import { Factory } from './test-factories/src/factory';
import { dummyTrackerData } from './../../fixtures/es6';

export const trackerFactory = new Factory(dummyTrackerData);

export const bindingsFactory = new Factory(dummyTrackerData.data.bindings[0]);

export const mountWithTracker = (component, tracker) => {
    let localVue = createLocalVue();
    localVue.use(Buefy);
    localVue.use(TreeView);

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
    localVue.use(TreeView);

    let store = storeFactory();

    let wrapper = mount(component, {
        localVue,
        i18n,
        store,
    });

    extend(wrapper);

    return wrapper;
};

const extend = (wrapper) => {
    wrapper.tabs = (index) => wrapper.findAll('.tabs li').at(index);
    wrapper.trs = (index) => wrapper.findAll('tr').at(index);
    wrapper.lis = (index) => wrapper.findAll('li').at(index);
};

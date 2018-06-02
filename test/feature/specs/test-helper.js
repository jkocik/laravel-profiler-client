import Buefy from 'buefy';
import TreeView from 'vue-json-tree-view';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import { Factory } from './test-factories/src/factory';
import { dummyTrackerData } from './../../fixtures/es6';

export const trackerFactory = new Factory(dummyTrackerData);

export const mountWithTracker = (component, tracker) => {
    let localVue = createLocalVue();
    localVue.use(Buefy);
    localVue.use(TreeView);

    let wrapper = mount(component, {
        localVue,
        i18n,
        propsData: {
            tracker,
        },
    });

    wrapper.tabs = (index) => wrapper.findAll('.tabs li').at(index);

    return wrapper;
};

import { filterService } from './../../services/filter.store.service';
import { trackersService } from './../../services/trackers.store.service';

const getters = {
    filtered: state => filterService.filter(state.all, state.filter, {
        running: state.allRunnings,
        env: state.allEnvs,
        type: state.allTypes,
        method: state.allMethods,
    }),
    allRunnings: state => state.allRunnings,
    allEnvs: state => state.allEnvs,
    allTypes: state => state.allTypes,
    allMethods: state => state.allMethods,
};

const mutations = {
    store(state, tracker) {
        state.all.unshift(tracker);
        trackersService.updateRunningFilter(state, tracker);
        trackersService.updateEnvFilter(state, tracker);
        trackersService.updateTypeFilter(state, tracker);
        trackersService.updateMethodFilter(state, tracker);
    },

    updateFilter(state, filterBy) {
        Object.assign(state.filter, filterBy);
    },
};

export function trackersFactory() {
    const state = {
        all: [],
        allRunnings: [],
        allEnvs: [],
        allTypes: [],
        allMethods: [],
        filter: {
            running: [],
            env: [],
            type: [],
            method: [],
        },
    };

    return {
        namespaced: true,
        state,
        getters,
        mutations,
    };
};

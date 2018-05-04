import { filterService } from './../../services/filter.store.service';
import { trackersService } from './../../services/trackers.store.service';

const getters = {
    filtered: state => filterService.filter(state.all, state.filter, {
        running: state.allRunnings,
        env: state.allEnvs,
        type: state.allTypes,
        statusGroup: state.allStatusGroups,
        method: state.allMethods,
    }),
    allRunnings: state => state.allRunnings,
    allEnvs: state => state.allEnvs,
    allTypes: state => state.allTypes,
    allStatusGroups: state => state.allStatusGroups,
    allMethods: state => state.allMethods,
};

const mutations = {
    store(state, tracker) {
        state.all.unshift(tracker);
        trackersService.updateRunningFilter(state, tracker);
        trackersService.updateEnvFilter(state, tracker);
        trackersService.updateTypeFilter(state, tracker);
        trackersService.updateStatusGroupFilter(state, tracker);
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
        allStatusGroups: [],
        allMethods: [],
        filter: {
            running: [],
            env: [],
            type: [],
            statusGroup: [],
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

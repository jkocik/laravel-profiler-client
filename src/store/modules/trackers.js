import { filterService } from './../../services/filter.store.service';
import { trackersService } from './../../services/trackers.store.service';

const getters = {
    filtered: state => filterService.filter(state.all, state.filter, {
        running: state.allRunnings,
        env: state.allEnvs,
        http: state.allHttp,
        method: state.allMethods,
    }),
    allRunnings: state => state.allRunnings,
    allEnvs: state => state.allEnvs,
    allHttp: state => state.allHttp,
    allMethods: state => state.allMethods,
};

const mutations = {
    store(state, tracker) {
        state.all.unshift(tracker);
        trackersService.updateRunningFilter(state, tracker);
        trackersService.updateEnvFilter(state, tracker);
        trackersService.updateHttpFilter(state, tracker);
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
        allHttp: [],
        allMethods: [],
        filter: {
            running: [],
            env: [],
            http: [],
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

import { filterService } from '@/services/filter.service';

const getters = {
    filtered: state => filterService.filter(state.all, state.filter),
    allEnvs: state => state.allEnvs,
    allVersions: state => state.allVersions,
};

const mutations = {
    store(state, tracker) {
        state.all.unshift(tracker);

        filterService.isNotIn(state.allEnvs, tracker.env) && state.filter.env.push(tracker.env);
        state.allEnvs = [ ...new Set([ ...state.allEnvs, tracker.env ]) ].sort();

        filterService.isNotIn(state.allVersions, tracker.version) && state.filter.version.push(tracker.version);
        state.allVersions = [ ...new Set([ ...state.allVersions, tracker.version ]) ].sort();
    },

    updateFilter(state, filterBy) {
        Object.assign(state.filter, filterBy);
    },
};

export function trackersFactory() {
    const state = {
        all: [],
        allEnvs: [],
        allVersions: [],
        filter: {
            env: [],
            version: [],
        },
    };

    return {
        namespaced: true,
        state,
        getters,
        mutations,
    };
};

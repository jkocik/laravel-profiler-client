import { filterService } from '@/services/filter.service';

const getters = {
    filtered: state => filterService.filter(state.all, state.filter),
    allEnvs: state => state.allEnvs,
};

const mutations = {
    store(state, tracker) {
        state.all.unshift(tracker);
        if (!~state.allEnvs.indexOf(tracker.env)) {
            state.filter.env.push(tracker.env);
        }
        state.allEnvs = [ ...new Set([ ...state.allEnvs, tracker.env ]) ].sort();
    },

    updateFilterEnv(state, filterByEnvs) {
        state.filter.env = filterByEnvs;
    },
};

export function trackersFactory() {
    const state = {
        all: [],
        allEnvs: [],
        filter: {
            env: [],
        },
    };

    return {
        namespaced: true,
        state,
        getters,
        mutations,
    };
};

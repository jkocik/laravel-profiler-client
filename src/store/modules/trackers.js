import { filterService } from '@/services/filter.service';

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

        filterService.isNotIn(state.allRunnings, tracker.running) && state.filter.running.push(tracker.running);
        state.allRunnings = [ ...new Set([ ...state.allRunnings, tracker.running ]) ].sort();

        filterService.isNotIn(state.allEnvs, tracker.env) && state.filter.env.push(tracker.env);
        state.allEnvs = [ ...new Set([ ...state.allEnvs, tracker.env ]) ].sort();

        filterService.isNotIn(state.allHttp, tracker.http) && state.filter.http.push(tracker.http);
        state.allHttp = [ ...new Set([ ...state.allHttp, tracker.http ]) ].sort();

        filterService.isNotIn(state.allMethods, tracker.method) && state.filter.method.push(tracker.method);
        state.allMethods = [ ...new Set([ ...state.allMethods, tracker.method ]) ].sort();
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

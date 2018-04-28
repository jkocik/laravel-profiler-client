import helper from './helper.service';

export const trackersService = {
    updateRunningFilter(state, tracker) {
        helper.isNotIn(state.allRunnings, tracker.running) && state.filter.running.push(tracker.running);
        state.allRunnings = helper.uniqueOf(state.allRunnings, tracker.running).sort();
    },

    updateEnvFilter(state, tracker) {
        helper.isNotIn(state.allEnvs, tracker.env) && state.filter.env.push(tracker.env);
        state.allEnvs = helper.uniqueOf(state.allEnvs, tracker.env).sort();
    },

    updateHttpFilter(state, tracker) {
        helper.isNotIn(state.allHttp, tracker.http) && state.filter.http.push(tracker.http);
        state.allHttp = helper.uniqueOf(state.allHttp, tracker.http).sort();
    },

    updateMethodFilter(state, tracker) {
        helper.isNotIn(state.allMethods, tracker.method) && state.filter.method.push(tracker.method);
        state.allMethods = helper.uniqueOf(state.allMethods, tracker.method).sort();
    },
};

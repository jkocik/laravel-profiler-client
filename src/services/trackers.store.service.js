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

    updateTypeGroupFilter(state, tracker) {
        helper.isNotIn(state.allTypeGroups, tracker.typeGroup) && state.filter.typeGroup.push(tracker.typeGroup);
        state.allTypeGroups = helper.uniqueOf(state.allTypeGroups, tracker.typeGroup).sort();
    },

    updateStatusGroupFilter(state, tracker) {
        helper.isNotIn(state.allStatusGroups, tracker.statusGroup) && state.filter.statusGroup.push(tracker.statusGroup);
        state.allStatusGroups = helper.uniqueOf(state.allStatusGroups, tracker.statusGroup).sort();
    },

    updateMethodFilter(state, tracker) {
        helper.isNotIn(state.allMethods, tracker.method) && state.filter.method.push(tracker.method);
        state.allMethods = helper.uniqueOf(state.allMethods, tracker.method).sort();
    },
};

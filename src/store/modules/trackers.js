import { bTableService } from './../../services/b-table.service';
import { filterService } from './../../services/filter.store.service';
import { trackersService } from './../../services/trackers.store.service';

const getters = {
    total: state => state.all.length,
    filtered: state => filterService.filter(state.all, state.filter, {
        running: state.allRunnings,
        env: state.allEnvs,
        typeGroup: state.allTypeGroups,
        statusGroup: state.allStatusGroups,
        method: state.allMethods,
    }),
    allRunnings: state => state.allRunnings,
    allEnvs: state => state.allEnvs,
    allTypeGroups: state => state.allTypeGroups,
    allStatusGroups: state => state.allStatusGroups,
    allMethods: state => state.allMethods,
    openedDetails: state => state.openedDetails,
};

const mutations = {
    store(state, tracker) {
        trackersService.guardTrackerType(tracker);
        state.all.unshift(tracker);
        trackersService.updateRunningFilter(state, tracker);
        trackersService.updateEnvFilter(state, tracker);
        trackersService.updateTypeGroupFilter(state, tracker);
        trackersService.updateStatusGroupFilter(state, tracker);
        trackersService.updateMethodFilter(state, tracker);
    },

    updateFilter(state, filterBy) {
        Object.assign(state.filter, filterBy);
    },

    toggleOpenedDetails(state, id) {
        bTableService.toggleOpenedDetails(state.openedDetails, id);
    },

    updateLastActiveDetailsTab(state, activeTab) {
        state.lastActiveDetailsTab = activeTab;
    },

    updateLastActiveDetailsTabOfTracker(state, { trackerId, activeTab }) {
        trackersService.findTracker(state, trackerId).lastActiveDetailsTab = activeTab;
    },
};

export function trackersFactory() {
    const state = {
        all: [],
        allRunnings: [],
        allEnvs: [],
        allTypeGroups: [],
        allStatusGroups: [],
        allMethods: [],
        filter: {
            running: [],
            env: [],
            typeGroup: [],
            statusGroup: [],
            method: [],
        },
        openedDetails: [],
        lastActiveDetailsTab: 0,
    };

    return {
        namespaced: true,
        state,
        getters,
        mutations,
    };
};

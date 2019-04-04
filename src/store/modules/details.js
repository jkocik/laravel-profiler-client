import { bTableService } from './../../services/b-table.service';

const getters = {
    openedDetails: state => state.openedDetails,
    lastActiveDetailsTabOfTracker: state => trackerId => state.lastActiveDetailsTabOfTracker[trackerId] || state.lastActiveDetailsTab,
};

const mutations = {
    toggleOpenedDetails(state, id) {
        bTableService.toggleOpenedDetails(state.openedDetails, id);
    },

    updateLastActiveDetailsTab(state, activeTab) {
        state.lastActiveDetailsTab = activeTab;
    },

    updateLastActiveDetailsTabOfTracker(state, { trackerId, activeTab }) {
        state.lastActiveDetailsTabOfTracker[trackerId] = activeTab;
    },
};

export function detailsFactory() {
    const state = {
        openedDetails: [],
        lastActiveDetailsTab: 0,
        lastActiveDetailsTabOfTracker: {},
    };

    return {
        namespaced: true,
        state,
        getters,
        mutations,
    };
};

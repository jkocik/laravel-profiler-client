import ActiveTab from './../../services/active-tab.service';
import { bTableService } from './../../services/b-table.service';

const getters = {
    openedDetails: state => state.openedDetails,
    lastActiveTabOfTracker: state => trackerId => {
        return (state.tabs.trackers[trackerId] && state.tabs.trackers[trackerId]['lastActive']) || state.tabs.lastActive;
    },
    lastActiveChildTabOfTracker: state => (trackerId, activeParentTab) => {
        return ((state.tabs.trackers[trackerId] && state.tabs.trackers[trackerId]['allActivated'][activeParentTab]) || new ActiveTab()).childTab;
    },
};

const mutations = {
    toggleOpenedDetails(state, id) {
        bTableService.toggleOpenedDetails(state.openedDetails, id);
    },

    updateLastActiveTab(state, activeTab) {
        state.tabs.lastActive = activeTab;
    },

    updateLastActiveTabOfTracker(state, { trackerId, activeTab }) {
        state.tabs.trackers[trackerId] = state.tabs.trackers[trackerId] || { allActivated: {} };
        state.tabs.trackers[trackerId]['lastActive'] = activeTab;
        state.tabs.trackers[trackerId]['allActivated'][activeTab.parentTab] = activeTab;
    },
};

export function detailsFactory() {
    const state = {
        openedDetails: [],
        tabs: {
            lastActive: new ActiveTab(),
            trackers: {},
        },
    };

    return {
        namespaced: true,
        state,
        getters,
        mutations,
    };
};

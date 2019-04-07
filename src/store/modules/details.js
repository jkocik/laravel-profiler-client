import Tab from './../../services/tab.service';
import { bTableService } from './../../services/b-table.service';
import { detailsService } from './../../services/details.store.service';

const getters = {
    openedDetails: state => state.openedDetails,
    lastActiveTrackerTab: state => trackerId => {
        return detailsService.findTrackerTabs(state, trackerId).lastActive || state.tabs.lastActive;
    },
    trackerTab: state => (trackerId, parentTab) => {
        return detailsService.findTrackerTab(state, trackerId, parentTab);
    },
};

const mutations = {
    toggleOpenedDetails(state, id) {
        bTableService.toggleOpenedDetails(state.openedDetails, id);
    },

    updateLastActiveTab(state, tab) {
        state.tabs.lastActive = tab;
    },

    updateTrackerTab(state, { trackerId, tab }) {
        state.tabs.trackers[trackerId] = detailsService.updateOrCreateTrackerTabs(state, trackerId, tab);
    },
};

export function detailsFactory() {
    const state = {
        openedDetails: [],
        tabs: {
            lastActive: new Tab(),
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

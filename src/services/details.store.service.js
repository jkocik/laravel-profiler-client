import TrackerTabs from './tracker-tabs.service';

export const detailsService = {
    findTrackerTabs(state, trackerId) {
        return state.tabs.trackers[trackerId] || new TrackerTabs();
    },

    findTrackerTab(state, trackerId, parentTab) {
        return this.findTrackerTabs(state, trackerId).find(parentTab);
    },

    updateOrCreateTrackerTabs(state, trackerId, tab) {
        const trackerTabs = this.findTrackerTabs(state, trackerId);
        trackerTabs.add(tab);
        return trackerTabs;
    },
};

<template>
    <b-tabs
        :value="activeTab"
        @input="updateActiveTab"
        size="is-small"
        :animated="false"
    >
        <b-tab-item :label="$t('message.dashboard.details.tabs.app')">
            <details-app></details-app>
        </b-tab-item>
        <b-tab-item :label="$t('message.dashboard.details.tabs.request')">
            <details-request></details-request>
        </b-tab-item>
        <b-tab-item :label="$t('message.dashboard.details.tabs.response')">
            <details-response></details-response>
        </b-tab-item>
    </b-tabs>
</template>

<script>
    import Tracker from './../../models/tracker';
    import DetailsApp from './details/DetailsApp';
    import DetailsRequest from './details/DetailsRequest';
    import DetailsResponse from './details/DetailsResponse';

    export default {
        components: {
            DetailsApp,
            DetailsRequest,
            DetailsResponse,
        },
        props: {
            tracker: Tracker,
        },
        created() {
            this.activeTab = this.tracker.lastActiveDetailsTab || this.$store.state.trackers.lastActiveDetailsTab;
            this.updateLastActiveDetailsTabOfTracker(this.activeTab);
        },
        data() {
            return {
                activeTab: 0,
            };
        },
        methods: {
            updateActiveTab(activeTab) {
                this.updateLastActiveDetailsTab(activeTab);
                this.updateLastActiveDetailsTabOfTracker(activeTab);
            },
            updateLastActiveDetailsTab(activeTab) {
                this.$store.commit('trackers/updateLastActiveDetailsTab', activeTab);
            },
            updateLastActiveDetailsTabOfTracker(activeTab) {
                this.$store.commit('trackers/updateLastActiveDetailsTabOfTracker', {
                    trackerId: this.tracker.id,
                    activeTab,
                });
            },
        },
    };
</script>

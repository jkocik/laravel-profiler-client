<template>
    <b-tabs
        :value="activeTab"
        @input="updateActiveTab"
        size="is-small"
        type="is-boxed"
        :animated="false"
    >
        <b-tab-item :label="$t('tab-labels.app')">
            <tab-app :tracker="tracker"></tab-app>
        </b-tab-item>
        <b-tab-item :disabled="! request.enabled" :label="$t(`tab-labels.${request.name}`)">
            <tab-http-request v-if="request.isHttpRequest()"
                :tracker="tracker"
            ></tab-http-request>
            <tab-console-finished-request v-if="request.isConsoleFinishedRequest()"
                :tracker="tracker"
            ></tab-console-finished-request>
        </b-tab-item>
    </b-tabs>
</template>

<script>
    import Tracker from './../../models/tracker';
    import TabApp from './details/TabApp';
    import TabHttpRequest from './details/TabHttpRequest';
    import TabConsoleFinishedRequest from './details/TabConsoleFinishedRequest';

    export default {
        components: {
            TabApp,
            TabHttpRequest,
            TabConsoleFinishedRequest,
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
                request: this.tracker.request,
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

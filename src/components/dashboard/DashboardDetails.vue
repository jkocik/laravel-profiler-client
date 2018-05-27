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

        <b-tab-item :disabled="! response.enabled" :label="$t(`tab-labels.${response.name}`)">
            <tab-http-response v-if="response.isHttpResponse()"
                :tracker="tracker"
            ></tab-http-response>
            <tab-console-finished-response v-if="response.isConsoleFinishedResponse()"
                :tracker="tracker"
            ></tab-console-finished-response>
        </b-tab-item>
    </b-tabs>
</template>

<script>
    import Tracker from './../../models/tracker';
    import TabApp from './details/TabApp';
    import TabHttpRequest from './details/TabHttpRequest';
    import TabHttpResponse from './details/TabHttpResponse';
    import TabConsoleFinishedRequest from './details/TabConsoleFinishedRequest';
    import TabConsoleFinishedResponse from './details/TabConsoleFinishedResponse';

    export default {
        components: {
            TabApp,
            TabHttpRequest,
            TabHttpResponse,
            TabConsoleFinishedRequest,
            TabConsoleFinishedResponse,
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
                request: this.tracker.request,
                response: this.tracker.response,
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

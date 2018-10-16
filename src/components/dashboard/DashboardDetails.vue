<template>
    <b-tabs
        :value="activeTab"
        @input="updateActiveTab"
        size="is-small"
        type="is-boxed"
        :animated="false"
    >
        <b-tab-item label="App">
            <keep-alive>
                <tab-app v-if="isActiveTab(0)"
                    :tracker="tracker"
                ></tab-app>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.request.enabled" :label="requestLabel">
            <keep-alive>
                <tab-http-request v-if="isActiveTab(1) && tracker.request.isHttpRequest()"
                    :tracker="tracker"
                ></tab-http-request>
            </keep-alive>
            <keep-alive>
                <tab-console-finished-request v-if="isActiveTab(1) && tracker.request.isConsoleFinishedRequest()"
                    :tracker="tracker"
                ></tab-console-finished-request>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.response.enabled" :label="responseLabel">
            <keep-alive>
                <tab-http-response v-if="isActiveTab(2) && tracker.response.isHttpResponse()"
                    :tracker="tracker"
                ></tab-http-response>
            </keep-alive>
            <keep-alive>
                <tab-console-finished-response v-if="isActiveTab(2) && tracker.response.isConsoleFinishedResponse()"
                    :tracker="tracker"
                ></tab-console-finished-response>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.hasViews()" :label="viewsLabel">
            <keep-alive>
                <tab-views v-if="isActiveTab(3) && tracker.hasViews()"
                    :tracker="tracker"
                ></tab-views>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.hasEvents()" :label="eventsLabel">
            <keep-alive>
                <tab-events v-if="isActiveTab(4) && tracker.hasEvents()"
                    :tracker="tracker"
                ></tab-events>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.hasQueries()" :label="queriesLabel">
            <keep-alive>
                <tab-queries v-if="isActiveTab(5) && tracker.hasQueries()"
                    :tracker="tracker"
                ></tab-queries>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.hasAuth()" :label="authLabel">
            <keep-alive>
                <tab-auth v-if="isActiveTab(6) && tracker.hasAuth()"
                     :tracker="tracker"
                ></tab-auth>
            </keep-alive>
        </b-tab-item>
    </b-tabs>
</template>

<script>
    import Tracker from './../../models/tracker';
    import TabApp from './details/TabApp';
    import TabAuth from './details/TabAuth';
    import TabViews from './details/TabViews';
    import TabEvents from './details/TabEvents';
    import TabQueries from './details/TabQueries';
    import TabHttpRequest from './details/TabHttpRequest';
    import TabHttpResponse from './details/TabHttpResponse';
    import TabConsoleFinishedRequest from './details/TabConsoleFinishedRequest';
    import TabConsoleFinishedResponse from './details/TabConsoleFinishedResponse';

    export default {
        name: 'dashboard-details',
        components: {
            TabApp,
            TabAuth,
            TabViews,
            TabEvents,
            TabQueries,
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
                requestLabel: this.$t(`tab-labels.${this.tracker.request.name}`),
                responseLabel: this.$t(`tab-labels.${this.tracker.response.name}`),
                viewsLabel: this.tracker.areViewsProvided()
                    ? `Views (${this.tracker.countViews()})`
                    : 'Views',
                eventsLabel: this.tracker.areEventsProvided()
                    ? `Events (${this.tracker.countEvents()})`
                    : 'Events',
                queriesLabel: this.tracker.areQueriesProvided()
                    ? `Queries (${this.tracker.countQueries()})`
                    : 'Queries',
                authLabel: 'Auth',
            };
        },
        methods: {
            updateActiveTab(activeTab) {
                this.activeTab = activeTab;
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
            isActiveTab(tab) {
                return this.activeTab === tab;
            },
        },
    };
</script>

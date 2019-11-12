<template>
    <keep-alive>
        <b-tabs
            :value="activeTab.parentTab"
            @input="updateActiveParentTab"
            size="is-small"
            type="is-boxed"
            :animated="false"
        >
            <b-tab-item label="App">
                <tab-app v-if="isActiveTab(0)"
                    :tracker="tracker"
                    :active-tab="activeTab.childTab"
                    @updateActiveTab="updateActiveChildTab"
                ></tab-app>
            </b-tab-item>

            <b-tab-item label="Performance">
                <tab-performance v-if="isActiveTab(1)"
                    :tracker="tracker"
                    :active-tab="activeTab.childTab"
                    @updateActiveTab="updateActiveChildTab"
                ></tab-performance>
            </b-tab-item>

            <b-tab-item :disabled="! tracker.request.enabled" :label="requestLabel">
                <tab-http-request v-if="isActiveTab(2) && tracker.request.isHttpRequest()"
                    :tracker="tracker"
                    :active-tab="activeTab.childTab"
                    @updateActiveTab="updateActiveChildTab"
                ></tab-http-request>
                <tab-console-finished-request v-if="isActiveTab(2) && tracker.request.isConsoleFinishedRequest()"
                    :tracker="tracker"
                ></tab-console-finished-request>
            </b-tab-item>

            <b-tab-item :disabled="! tracker.response.enabled" :label="responseLabel">
                <tab-http-response v-if="isActiveTab(3) && tracker.response.isHttpResponse()"
                    :tracker="tracker"
                    :active-tab="activeTab.childTab"
                    @updateActiveTab="updateActiveChildTab"
                ></tab-http-response>
                <tab-console-finished-response v-if="isActiveTab(3) && tracker.response.isConsoleFinishedResponse()"
                    :tracker="tracker"
                ></tab-console-finished-response>
            </b-tab-item>

            <b-tab-item :disabled="! tracker.hasViews()" :label="viewsLabel">
                <tab-views v-if="isActiveTab(4) && tracker.hasViews()"
                    :tracker="tracker"
                ></tab-views>
            </b-tab-item>

            <b-tab-item :disabled="! tracker.hasEvents()" :label="eventsLabel">
                <tab-events v-if="isActiveTab(5) && tracker.hasEvents()"
                    :tracker="tracker"
                ></tab-events>
            </b-tab-item>

            <b-tab-item :disabled="! tracker.hasQueries()" :label="queriesLabel">
                <tab-queries v-if="isActiveTab(6) && tracker.hasQueries()"
                    :tracker="tracker"
                ></tab-queries>
            </b-tab-item>

            <b-tab-item :disabled="! tracker.hasRedis()" :label="redisLabel">
                <tab-redis v-if="isActiveTab(7) && tracker.hasRedis()"
                    :tracker="tracker"
                ></tab-redis>
            </b-tab-item>

            <b-tab-item :disabled="! tracker.hasAuth()" :label="authLabel">
                <tab-auth v-if="isActiveTab(8) && tracker.hasAuth()"
                     :tracker="tracker"
                ></tab-auth>
            </b-tab-item>

            <b-tab-item :disabled="! tracker.hasException()" :label="exceptionLabel">
                <tab-exception v-if="isActiveTab(9) && tracker.hasException()"
                    :tracker="tracker"
                ></tab-exception>
            </b-tab-item>
        </b-tabs>
    </keep-alive>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Tracker from './../../models/tracker';
    import ActiveTab from './../../services/tab.service';
    import TabApp from './details/TabApp';
    import TabAuth from './details/TabAuth';
    import TabRedis from './details/TabRedis';
    import TabViews from './details/TabViews';
    import TabEvents from './details/TabEvents';
    import TabQueries from './details/TabQueries';
    import TabException from './details/TabException';
    import TabPerformance from './details/TabPerformance';
    import TabHttpRequest from './details/TabHttpRequest';
    import TabHttpResponse from './details/TabHttpResponse';
    import TabConsoleFinishedRequest from './details/TabConsoleFinishedRequest';
    import TabConsoleFinishedResponse from './details/TabConsoleFinishedResponse';

    export default {
        name: 'dashboard-details',
        components: {
            TabApp,
            TabAuth,
            TabRedis,
            TabViews,
            TabEvents,
            TabQueries,
            TabException,
            TabPerformance,
            TabHttpRequest,
            TabHttpResponse,
            TabConsoleFinishedRequest,
            TabConsoleFinishedResponse,
        },
        props: {
            tracker: Tracker,
        },
        created() {
            this.activeTab = this.lastActiveTrackerTab(this.tracker.id);
            this.updateTrackerTab();
        },
        computed: {
            ...mapGetters('details', [
                'openedDetails',
                'lastActiveTrackerTab',
                'trackerTab',
            ]),
        },
        data() {
            return {
                activeTab: new ActiveTab(),
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
                redisLabel: this.tracker.isRedisProvided()
                    ? `Redis (${this.tracker.countRedis()})`
                    : 'Redis',
                authLabel: 'Auth',
                exceptionLabel: 'Exception',
            };
        },
        methods: {
            updateActiveParentTab(activeParentTab) {
                this.activeTab = new ActiveTab(
                    activeParentTab,
                    this.trackerTab(this.tracker.id, activeParentTab).childTab,
                );
                this.updateLastActiveTab();
                this.updateTrackerTab();
            },
            updateActiveChildTab(activeChildTab) {
                this.activeTab = new ActiveTab(
                    this.activeTab.parentTab,
                    activeChildTab
                );
                this.updateLastActiveTab();
                this.updateTrackerTab();
            },
            updateLastActiveTab() {
                this.$store.commit('details/updateLastActiveTab', this.activeTab);
            },
            updateTrackerTab() {
                this.$store.commit('details/updateTrackerTab', {
                    trackerId: this.tracker.id,
                    tab: this.activeTab,
                });
            },
            isActiveTab(parentTab) {
                return this.activeTab.parentTab === parentTab;
            },
        },
    };
</script>

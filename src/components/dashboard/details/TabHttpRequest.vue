<template>
    <b-tabs
        :value="activeTab"
        @input="updateActiveTab"
        size="is-small"
        :animated="false"
    >
        <b-tab-item label="Request">
            <keep-alive>
                <tab-http-request-summary v-if="isActiveTab(0)"
                    :tracker="tracker"
                ></tab-http-request-summary>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.request.hasInput()" :label="inputLabel">
            <keep-alive>
                <tab-http-request-input v-if="isActiveTab(1) && tracker.request.hasInput()"
                    :tracker="tracker"
                ></tab-http-request-input>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.hasSession()" :label="sessionLabel">
            <keep-alive>
                <tab-http-session v-if="isActiveTab(2) && tracker.hasSession()"
                    :tracker="tracker"
                ></tab-http-session>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.route.enabled" label="Route">
            <keep-alive>
                <tab-http-route v-if="isActiveTab(3) && tracker.route.enabled"
                    :tracker="tracker"
                ></tab-http-route>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.request.hasServer()" label="Server">
            <keep-alive>
                <tab-http-request-server v-if="isActiveTab(4) && tracker.request.hasServer()"
                    :tracker="tracker"
                ></tab-http-request-server>
            </keep-alive>
        </b-tab-item>
    </b-tabs>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import TabHttpRoute from './TabHttpRoute';
    import TabHttpSession from './TabHttpSession';
    import TabHttpRequestInput from './TabHttpRequestInput';
    import TabHttpRequestServer from './TabHttpRequestServer';
    import TabHttpRequestSummary from './TabHttpRequestSummary';

    export default {
        name: 'tab-http-request',
        components: {
            TabHttpRoute,
            TabHttpSession,
            TabHttpRequestInput,
            TabHttpRequestServer,
            TabHttpRequestSummary,
        },
        props: {
            tracker: Tracker,
            activeTab: {
                type: Number,
                default: 0,
            },
        },
        data() {
            return {
                inputLabel: `Input (${this.tracker.request.countInput()})`,
                sessionLabel: this.tracker.isSessionProvided()
                    ? `Session (${this.tracker.countSession()})`
                    : 'Session',
            };
        },
        methods: {
            updateActiveTab(activeTab) {
                this.$emit('updateActiveTab', activeTab);
            },
            isActiveTab(tab) {
                return this.activeTab === tab;
            },
        },
    };
</script>

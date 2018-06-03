<template>
    <b-tabs
        size="is-small"
        :animated="false"
    >
        <b-tab-item label="Request">
            <tab-http-request-summary :tracker="tracker"></tab-http-request-summary>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.request.hasInput()" :label="inputLabel">
            <tab-http-request-input v-if="tracker.request.hasInput()" :tracker="tracker"></tab-http-request-input>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.hasSession()" :label="sessionLabel">
            <tab-http-session v-if="tracker.hasSession()" :tracker="tracker"></tab-http-session>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.route.enabled" label="Route">
            <tab-http-route v-if="tracker.route.enabled" :tracker="tracker"></tab-http-route>
        </b-tab-item>

        <b-tab-item label="Server">
            <tab-http-request-server :tracker="tracker"></tab-http-request-server>
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
        },
        data() {
            return {
                inputLabel: `Input (${this.tracker.request.countInput()})`,
                sessionLabel: `Session (${this.tracker.countSession()})`,
            };
        },
    };
</script>

<template>
    <b-tabs
        size="is-small"
        :animated="false"
    >
        <b-tab-item :label="summaryLabel">
            <tab-http-request-summary :tracker="tracker"></tab-http-request-summary>
        </b-tab-item>
        <b-tab-item :disabled="! request.hasInput()" :label="inputLabel">
            <tab-http-request-input v-if="request.hasInput()" :tracker="tracker"></tab-http-request-input>
        </b-tab-item>
        <b-tab-item :disabled="! tracker.hasSession()" :label="sessionLabel">
            <tab-http-session v-if="tracker.hasSession()" :tracker="tracker"></tab-http-session>
        </b-tab-item>
        <b-tab-item :label="routeLabel">
            <tab-http-route :tracker="tracker"></tab-http-route>
        </b-tab-item>
        <b-tab-item :label="serverLabel">
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
                request: this.tracker.request,
                summaryLabel: this.$t('tab-labels.http-request-summary'),
                inputLabel: this.$t('tab-labels.http-request-input', { count: this.tracker.request.countInput() }),
                sessionLabel: this.$t('tab-labels.http-session', { count: this.tracker.countSession() }),
                routeLabel: this.$t('tab-labels.http-route'),
                serverLabel: this.$t('tab-labels.http-request-server'),
            };
        },
    };
</script>

<template>
    <b-tabs
        size="is-small"
        :animated="false"
    >
        <b-tab-item :label="$t('tab-labels.http-request-summary')">
            <tab-http-request-summary :tracker="tracker"></tab-http-request-summary>
        </b-tab-item>
        <b-tab-item :disabled="! request.hasInput()" :label="inputLabel()">
            <tab-http-request-input v-if="request.hasInput()" :tracker="tracker"></tab-http-request-input>
        </b-tab-item>
        <b-tab-item :label="$t('tab-labels.http-route')">
            <tab-http-route :tracker="tracker"></tab-http-route>
        </b-tab-item>
        <b-tab-item :label="$t('tab-labels.http-request-server')">
            <tab-http-request-server :tracker="tracker"></tab-http-request-server>
        </b-tab-item>
    </b-tabs>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import TabHttpRoute from './TabHttpRoute';
    import TabHttpRequestInput from './TabHttpRequestInput';
    import TabHttpRequestServer from './TabHttpRequestServer';
    import TabHttpRequestSummary from './TabHttpRequestSummary';

    export default {
        name: 'tab-http-request',
        components: {
            TabHttpRoute,
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
            };
        },
        methods: {
            inputLabel() {
                return this.$t('tab-labels.http-request-input', { count: this.request.countInput() });
            },
        },
    };
</script>

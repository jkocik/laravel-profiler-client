<template>
    <b-tabs
        size="is-small"
        :animated="false"
    >
        <b-tab-item label="Response">
            <tab-http-response-summary :tracker="tracker"></tab-http-response-summary>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.response.hasContent()" label="Content">
            <tab-http-response-content v-if="tracker.response.hasContent()" :tracker="tracker"></tab-http-response-content>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.response.isJson()" label="JSON">
            <tab-http-response-json v-if="tracker.response.isJson()" :tracker="tracker"></tab-http-response-json>
        </b-tab-item>
    </b-tabs>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import TabHttpResponseJson from './TabHttpResponseJson';
    import TabHttpResponseSummary from './TabHttpResponseSummary';
    import TabHttpResponseContent from './TabHttpResponseContent';

    export default {
        name: 'tab-http-response',
        components: {
            TabHttpResponseJson,
            TabHttpResponseSummary,
            TabHttpResponseContent,
        },
        props: {
            tracker: Tracker,
        },
    };
</script>

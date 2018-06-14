<template>
    <b-tabs
        :value="activeTab"
        @input="updateActiveTab"
        size="is-small"
        :animated="false"
    >
        <b-tab-item label="Response">
            <keep-alive>
                <tab-http-response-summary v-if="isActiveTab(0)"
                    :tracker="tracker"
                ></tab-http-response-summary>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.response.hasContent()" label="Content">
            <keep-alive>
                <tab-http-response-content v-if="isActiveTab(1) && tracker.response.hasContent()"
                    :tracker="tracker"
                ></tab-http-response-content>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.response.isJson()" label="JSON">
            <keep-alive>
                <tab-http-response-json v-if="isActiveTab(2) && tracker.response.isJson()"
                    :tracker="tracker"
                ></tab-http-response-json>
            </keep-alive>
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
        data() {
            return {
                activeTab: 0,
            };
        },
        methods: {
            updateActiveTab(activeTab) {
                this.activeTab = activeTab;
            },
            isActiveTab(tab) {
                return this.activeTab === tab;
            },
        },
    };
</script>

<template>
    <b-tabs
        :value="activeTab"
        @input="updateActiveTab"
        size="is-small"
        :animated="false"
    >
        <b-tab-item label="Summary">
            <keep-alive>
                <tab-performance-summary v-if="isActiveTab(0)"
                    :tracker="tracker"
                ></tab-performance-summary>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.performance.hasCustom()" label="Custom">
            <keep-alive>
                <tab-performance-custom v-if="isActiveTab(1)"
                    :tracker="tracker"
                ></tab-performance-custom>
            </keep-alive>
        </b-tab-item>
    </b-tabs>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import TabPerformanceCustom from './TabPerformanceCustom';
    import TabPerformanceSummary from './TabPerformanceSummary';

    export default {
        name: 'tab-performance',
        components: {
            TabPerformanceCustom,
            TabPerformanceSummary,
        },
        props: {
            tracker: Tracker,
            activeTab: {
                type: Number,
                default: 0,
            },
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

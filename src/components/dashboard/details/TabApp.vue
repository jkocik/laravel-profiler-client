<template>
    <b-tabs
        size="is-small"
        :animated="false"
    >
        <b-tab-item :label="$t('tab-labels.application')">
            <tab-application :tracker="tracker"></tab-application>
        </b-tab-item>
        <b-tab-item :disabled="! tracker.hasConfig()" :label="configLabel()">
            <tab-config v-if="tracker.hasConfig()" :tracker="tracker"></tab-config>
        </b-tab-item>
        <b-tab-item :disabled="! tracker.hasServiceProviders()" :label="serviceProvidersLabel()">
            <tab-service-providers v-if="tracker.hasServiceProviders()" :tracker="tracker"></tab-service-providers>
        </b-tab-item>
        <b-tab-item :disabled="! tracker.hasBindings()" :label="bindingsLabel()">
            <tab-bindings v-if="tracker.hasBindings()" :tracker="tracker"></tab-bindings>
        </b-tab-item>
        <b-tab-item :disabled="! tracker.hasPaths()" :label="pathsLabel()">
            <tab-paths v-if="tracker.hasPaths()" :tracker="tracker"></tab-paths>
        </b-tab-item>
    </b-tabs>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import TabPaths from './TabPaths';
    import TabConfig from './TabConfig';
    import TabBindings from './TabBindings';
    import TabApplication from './TabApplication';
    import TabServiceProviders from './TabServiceProviders';

    export default {
        name: 'TabApp',
        components: {
            TabPaths,
            TabConfig,
            TabBindings,
            TabApplication,
            TabServiceProviders,
        },
        props: {
            tracker: Tracker,
        },
        methods: {
            configLabel() {
                return this.tracker.hasConfig()
                    ? `${this.$t('tab-labels.config')} (${this.tracker.countConfig()})`
                    : this.$t('tab-labels.config');
            },
            pathsLabel() {
                return this.tracker.hasPaths()
                    ? `${this.$t('tab-labels.paths')} (${this.tracker.countPaths()})`
                    : this.$t('tab-labels.paths');
            },
            bindingsLabel() {
                return this.tracker.hasBindings()
                    ? `${this.$t('tab-labels.bindings')} (${this.tracker.countBindings()})`
                    : this.$t('tab-labels.bindings');
            },
            serviceProvidersLabel() {
                return this.tracker.hasBindings()
                    ? `${this.$t('tab-labels.service-providers')} (${this.tracker.countServiceProviders()})`
                    : this.$t('tab-labels.service-providers');
            },
        },
    };
</script>

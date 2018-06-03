<template>
    <b-tabs
        size="is-small"
        :animated="false"
    >
        <b-tab-item label="Application">
            <tab-application :tracker="tracker"></tab-application>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.hasConfig()" :label="configLabel">
            <tab-config v-if="tracker.hasConfig()" :tracker="tracker"></tab-config>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.hasServiceProviders()" :label="serviceProvidersLabel">
            <tab-service-providers v-if="tracker.hasServiceProviders()" :tracker="tracker"></tab-service-providers>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.hasBindings()" :label="bindingsLabel">
            <tab-bindings v-if="tracker.hasBindings()" :tracker="tracker"></tab-bindings>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.hasPaths()" :label="pathsLabel">
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
        name: 'tab-app',
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
        data() {
            return {
                configLabel: this.tracker.hasConfig()
                    ? `Config (${this.tracker.countConfig()})`
                    : 'Config',
                serviceProvidersLabel: this.tracker.hasServiceProviders()
                    ? `Loaded Service Providers (${this.tracker.countServiceProviders()})`
                    : 'Loaded Service Providers',
                bindingsLabel: this.tracker.hasBindings()
                    ? `Bindings (${this.tracker.countBindings()})`
                    : 'Bindings',
                pathsLabel: this.tracker.hasPaths()
                    ? `Paths (${this.tracker.countPaths()})`
                    : 'Paths',
            };
        },
    };
</script>

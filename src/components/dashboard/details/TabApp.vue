<template>
    <b-tabs
        :value="activeTab"
        @input="updateActiveTab"
        size="is-small"
        :animated="false"
    >
        <b-tab-item label="Application">
            <keep-alive>
                <tab-application v-if="isActiveTab(0)"
                    :tracker="tracker"
                ></tab-application>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.hasConfig()" :label="configLabel">
            <keep-alive>
                <tab-config v-if="isActiveTab(1) && tracker.hasConfig()"
                    :tracker="tracker"
                ></tab-config>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.hasServiceProviders()" :label="serviceProvidersLabel">
            <keep-alive>
                <tab-service-providers v-if="isActiveTab(2) && tracker.hasServiceProviders()"
                    :tracker="tracker"
                ></tab-service-providers>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.hasBindings()" :label="bindingsLabel">
            <keep-alive>
                <tab-bindings v-if="isActiveTab(3) && tracker.hasBindings()"
                    :tracker="tracker"
                ></tab-bindings>
            </keep-alive>
        </b-tab-item>

        <b-tab-item :disabled="! tracker.hasPaths()" :label="pathsLabel">
            <keep-alive>
                <tab-paths v-if="isActiveTab(4) && tracker.hasPaths()"
                    :tracker="tracker"
                ></tab-paths>
            </keep-alive>
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
                activeTab: 0,
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

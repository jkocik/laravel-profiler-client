<template>
    <b-table
        :data="data"
        :narrowed="true"
        class="is-sub-tab"
    >
        <template slot-scope="props">
            <td>{{ props.row.label }}</td>
            <td v-if="! props.row.isBool">{{ props.row.item }}</td>
            <td v-if="props.row.isBool"><true-false :value="props.row.item"></true-false></td>
        </template>
    </b-table>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import TrueFalse from './../../partials/TrueFalse';

    export default {
        name: 'tab-application',
        components: {
            TrueFalse,
        },
        props: {
            tracker: Tracker,
        },
        data() {
            return {
                data: [
                    {
                        label: this.$t('tabs.application.env'),
                        item: this.tracker.env,
                        isBool: false,
                    },
                    {
                        label: this.$t('tabs.application.via'),
                        item: this.tracker.running,
                        isBool: false,
                    },
                    {
                        label: this.$t('tabs.application.laravel-version'),
                        item: this.tracker.laravel_version,
                        isBool: false,
                    },
                    {
                        label: this.$t('tabs.application.php-version'),
                        item: this.tracker.php_version,
                        isBool: false,
                    },
                    {
                        label: this.$t('tabs.application.locale'),
                        item: this.tracker.application.locale,
                        isBool: false,
                    },
                    {
                        label: this.$t('tabs.application.routes-are-cached'),
                        item: this.tracker.application.routesAreCached,
                        isBool: true,
                    },
                    {
                        label: this.$t('tabs.application.configuration-is-cached'),
                        item: this.tracker.application.configurationIsCached,
                        isBool: true,
                    },
                    {
                        label: this.$t('tabs.application.is-down-for-maintenance'),
                        item: this.tracker.application.isDownForMaintenance,
                        isBool: true,
                    },
                    {
                        label: this.$t('tabs.application.should-skip-middleware'),
                        item: this.tracker.application.shouldSkipMiddleware,
                        isBool: true,
                    },
                ],
            };
        },
    };
</script>

<template>
    <b-table
        :data="data"
        :narrowed="true"
        class="is-sub-tab"
    >
        <template slot-scope="props">
            <td>{{ props.row.label }}</td>
            <td :class="props.row.class">{{ props.row.item }}</td>
        </template>
    </b-table>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-performance-summary',
        props: {
            tracker: Tracker,
        },
        data() {
            return {
                data: [
                    {
                        label: this.$t('tabs.performance.summary-laravel'),
                        item: this.tracker.performance.summaryLaravelForHuman,
                    },
                    {
                        label: this.$t('tabs.performance.memory-peak'),
                        item: this.tracker.performance.memoryPeakForHuman,
                        class: { 'has-text-grey-lighter': this.tracker.isEnvTesting() },
                    },
                ],
            };
        },
    };
</script>

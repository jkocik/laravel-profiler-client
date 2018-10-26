<template>
    <section>
        <div>
            <div class="chart">
            </div>
        </div>
        <div>
            <b-table
                :data="tableA"
                :narrowed="true"
                class="is-sub-tab"
            >
                <template slot-scope="props">
                    <td>{{ props.row.label }}</td>
                    <td :class="props.row.class">{{ props.row.item }}</td>
                </template>
            </b-table>
            <hr>
            <b-table
                :data="tableB"
                :narrowed="true"
                class="is-sub-tab"
            >
                <template slot-scope="props">
                    <td>{{ props.row.label }}</td>
                    <td>{{ props.row.item }}</td>
                </template>
            </b-table>
            <hr>
            <b-table
                :data="tableC"
                :narrowed="true"
                class="is-sub-tab"
            >
                <template slot-scope="props">
                    <td>{{ props.row.label }}</td>
                    <td>{{ props.row.item }}</td>
                    <td>{{ $t(`tabs.performance.${props.row.label}`) }}</td>
                </template>
            </b-table>
        </div>
        <div>
            <div class="chart">
            </div>
        </div>
    </section>
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
                tableA: [
                    {
                        label: this.$t('tabs.performance.memory-peak'),
                        item: this.tracker.performance.memoryPeakForHuman,
                        class: { 'has-text-grey-lighter': this.tracker.isEnvTesting() },
                    },
                ],
                tableB: [
                    {
                        label: this.$t('tabs.performance.summary-laravel'),
                        item: this.tracker.performance.laravelTimeForHuman,
                    },
                ],
                tableC: this.tracker.performance.summaryTable,
            };
        },
    };
</script>

<style lang="sass" scoped>
    section
        display: flex
        flex-direction: row

        & > div
            flex: 1

            div.chart
                margin: 5% 15%
</style>

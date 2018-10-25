<template>
    <section>
        <div>
            <div>
                .
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
                tableB: this.tracker.performance.summaryTable,
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

            &:first-child > div
                margin: 0 25%
</style>

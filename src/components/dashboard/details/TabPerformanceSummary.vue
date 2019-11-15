<template>
    <section class="columns">

        <div class="column">
            <div class="chart">
                <c-performance-summary
                    :tracker="tracker"
                ></c-performance-summary>
            </div>
        </div>

        <div class="column is-two-fifths">
            <div class="columns top">
                <div class="column is-half has-text-centered">
                    <p>{{ $t('tabs.performance.summary-laravel') }}</p>
                    <p><b-tag type="is-large">{{ tracker.performance.laravelTimeForHuman }}</b-tag></p>
                </div>
                <div class="column has-text-centered" v-if="! tracker.isEnvTesting()">
                    <p>{{ $t('tabs.performance.memory-peak') }}</p>
                    <p><b-tag type="is-large">{{ tracker.performance.memoryPeakForHuman }}</b-tag></p>
                </div>
            </div>

            <div class="columns">
                <div class="column is-two-third summary">
                    <p v-for="(summary, index) of this.tracker.performance.summaryLegendData($t)" :key="index">
                        <b-tag :style="{ 'background-color': summary.color }"></b-tag>
                        <span>{{ summary.item }}</span>
                        <span>{{ summary.label }}</span>
                    </p>
                </div>
                <div class="column queries has-text-right" v-if="tracker.performance.hasQueriesOrRedis()">
                    <p v-for="(query, index) of this.tracker.performance.queriesLegendData()" :key="index">
                        <span>{{ query.label }}</span>
                        <span>{{ query.item }}</span>
                        <b-tag :style="{ 'background-color': query.color }"></b-tag>
                    </p>
                </div>
            </div>
        </div>

        <div class="column">
            <div class="chart">
                <c-performance-queries v-if="tracker.performance.hasQueriesOrRedis()"
                    :tracker="tracker"
                ></c-performance-queries>
            </div>
        </div>

    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import CPerformanceSummary from './../../chartjs/CPerformanceSummary';
    import CPerformanceQueries from './../../chartjs/CPerformanceQueries';

    export default {
        name: 'tab-performance-summary',
        components: {
            CPerformanceSummary,
            CPerformanceQueries,
        },
        props: {
            tracker: Tracker,
        },
    };
</script>

<style lang="sass" src="./../../../css/tab-performance-summary-scoped.sass" scoped></style>

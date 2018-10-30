<template>
    <section>
        <c-performance-custom :style="style"
            :tracker="tracker"
        ></c-performance-custom>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import CPerformanceCustom from './../../chartjs/CPerformanceCustom';

    export default {
        name: 'tab-performance-custom',
        components: {
            CPerformanceCustom,
        },
        props: {
            tracker: Tracker,
        },
        data() {
            return {
                style: {
                    height: this.tracker.performance.customChartHeight,
                },
            };
        },
    };
</script>

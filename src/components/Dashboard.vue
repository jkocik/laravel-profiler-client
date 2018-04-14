<template>
    <div>
        <table>
            <tracker-meta-row
                v-for="tracker of trackers"
                :key="tracker.id"
                :tracker="tracker"
            ></tracker-meta-row>
        </table>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import TrackerMetaRow from './partials/TrackerMetaRow';

    export default {
        components: {
            TrackerMetaRow,
        },
        computed: {
            ...mapGetters('trackers', {
                trackers: 'all',
            }),
        },
    };
</script>

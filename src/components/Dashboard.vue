<template>
    <section class="container is-widescreen">
        <table class="table is-fullwidth is-narrow is-hoverable has-mobile-cards" v-if="trackers.length">
            <tbody>
                <trackers-table-row
                    v-for="tracker of trackers"
                    :key="tracker.id"
                    :tracker="tracker"
                ></trackers-table-row>
            </tbody>
        </table>
        <p class="has-text-centered" v-if="! trackers.length">
            {{ $t('message.trackers-list-is-empty') }}...
        </p>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';
    import TrackersTableRow from './partials/TrackersTableRow';

    export default {
        components: {
            TrackersTableRow,
        },
        computed: {
            ...mapGetters('trackers', {
                trackers: 'all',
            }),
        },
    };
</script>

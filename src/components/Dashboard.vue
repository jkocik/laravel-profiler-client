<template>
    <section class="container is-widescreen">
        <b-table
            :data="trackers"
            :columns="columns"
            :narrowed="true"
            :focusable="true"
            class="has-hidden-thead"
        >
            <template slot="empty">
                <p class="has-text-centered">
                    {{ $t('message.trackers-list-is-empty') }}...
                </p>
            </template>
        </b-table>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters('trackers', {
                trackers: 'all',
            }),
        },
        data() {
            return {
                columns: [
                    { field: 'id' },
                    { field: 'version' },
                    { field: 'env' },
                ],
            };
        },
    };
</script>

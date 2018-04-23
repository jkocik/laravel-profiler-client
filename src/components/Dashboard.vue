<template>
    <section class="dashboard">
        <nav class="navbar is-fixed-top is-dark">
            <div class="navbar-brand container is-widescreen">
                <h1 class="navbar-item">Laravel Profiler</h1>
            </div>
        </nav>
        <nav class="navbar is-fixed-top">
            <header-filter></header-filter>
        </nav>
        <div class="container is-widescreen">
            <b-table
                :data="trackers"
                :columns="columns"
                :narrowed="true"
                :focusable="true"
                :paginated="true"
                :per-page="perPage"
                class="has-hidden-thead has-hidden-pagination-arrows"
            >
                <template slot="empty">
                    <p class="has-text-centered">
                        {{ $t('message.trackers-list-is-empty') }}...
                    </p>
                </template>
            </b-table>
        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';
    import HeaderFilter from './dashboard/HeaderFilter';

    export default {
        components: {
            HeaderFilter,
        },
        computed: {
            ...mapGetters('trackers', {
                trackers: 'filtered',
            }),
        },
        data() {
            return {
                columns: [
                    { field: 'id' },
                    { field: 'version' },
                    { field: 'env' },
                ],
                perPage: 5,
            };
        },
    };
</script>

<style lang="sass" scoped>
    h1
        font-size: 1.5rem

    nav.is-fixed-top + nav
        top: 4rem
</style>

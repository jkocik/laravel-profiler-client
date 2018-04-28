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
                :narrowed="true"
                :focusable="true"
                :paginated="true"
                :per-page="perPage"
                class="has-hidden-thead has-hidden-pagination-arrows"
            >
                <template slot-scope="props">
                    <td>
                        <b-taglist attached>
                            <b-tag type="is-white">at</b-tag>
                            <b-tag type="is-light">{{ props.row.executionTimeAt }}</b-tag>
                        </b-taglist>
                    </td>
                    <td>
                        <b-taglist attached>
                            <b-tag type="is-white">via</b-tag>
                            <b-tag type="is-light">{{ props.row.running }}</b-tag>
                        </b-taglist>
                    </td>
                    <td>
                        <b-taglist attached>
                            <b-tag type="is-white">env</b-tag>
                            <b-tag type="is-light">{{ props.row.env }}</b-tag>
                        </b-taglist>
                    </td>
                    <td>
                        <b-taglist attached>
                            <b-tag type="is-white">v</b-tag>
                            <b-tag type="is-light">{{ props.row.version }}</b-tag>
                        </b-taglist>
                    </td>
                    <td>
                        <b-taglist attached>
                            <b-tag type="is-white">http</b-tag>
                            <b-tag type="is-light">{{ props.row.http }}</b-tag>
                        </b-taglist>
                    </td>
                    <td>
                        <b-taglist attached>
                            <b-tag type="is-light">{{ props.row.method }}</b-tag>
                            <b-tag type="is-success">{{ props.row.status }}</b-tag>
                            <b-tag type="is-light">{{ props.row.path }}</b-tag>
                        </b-taglist>
                    </td>
                </template>
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

    table
        tbody
            tr
                td:nth-child(1)
                    width: 100px

                td:nth-child(2),
                td:nth-child(3),
                td:nth-child(5)
                    width: 115px

                td:nth-child(4)
                    width: 100px

        .tag
            font-size: .78rem
</style>

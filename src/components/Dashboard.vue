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
                            <b-tag type="is-white">{{ $t('message.dashboard.at') }}</b-tag>
                            <b-tag type="is-light">{{ props.row.executionAt }}</b-tag>
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
                            <b-tag type="is-white">{{ $t('message.dashboard.via') }}</b-tag>
                            <b-tag type="is-light">{{ props.row.running }}</b-tag>
                        </b-taglist>
                    </td>
                    <td>
                        <b-taglist attached>
                            <b-tag type="is-light">{{ props.row.type }}</b-tag>
                        </b-taglist>
                    </td>
                    <td>
                        <b-taglist attached>
                            <b-tag :type="props.row.statusColor">{{ props.row.status }}</b-tag>
                            <b-tag type="is-light">{{ props.row.method }}</b-tag>
                            <b-tooltip
                                :label="props.row.path"
                                type="is-light"
                                position="is-bottom"
                            >
                                <b-tag type="is-light">{{ props.row.path }}</b-tag>
                            </b-tooltip>
                        </b-taglist>
                    </td>
                    <td>
                        <b-taglist attached>
                            <b-tag type="is-white">v</b-tag>
                            <b-tag type="is-light">{{ props.row.laravel_version }}</b-tag>
                            <b-tag type="is-light">{{ props.row.php_version }}</b-tag>
                        </b-taglist>
                    </td>
                </template>
                <template slot="empty">
                    <p class="has-text-centered">
                        {{ $t('message.dashboard.trackers-list-is-empty') }}
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
                perPage: 15,
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
                td:nth-child(1),
                td:nth-child(2),
                td:nth-child(3),
                td:nth-child(4)
                    width: 100px

                td:nth-child(6)
                    width: 115px

                td:nth-child(5)
                    .tag
                        white-space: nowrap
                        overflow: hidden
                        max-width: 150px
                        justify-content: flex-end

        .tag
            font-size: .78rem
</style>

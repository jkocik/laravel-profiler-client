<template>
    <section class="dashboard">
        <nav class="navbar is-fixed-top is-dark">
            <div class="navbar-brand container is-widescreen">
                <h1 class="navbar-item">Laravel Profiler</h1>
            </div>
        </nav>
        <nav class="navbar is-fixed-top">
            <dashboard-filter></dashboard-filter>
        </nav>
        <div class="container is-widescreen">
            <dashboard-table
                :data="trackers"
                :narrowed="true"
                :hoverable="true"
                :paginated="true"
                :per-page="perPage"
                :row-class="rowClass"
                detailed
                detail-key="id"
                :opened-detailed="openedDetails"
                @click="rowClicked"
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
                            <b-tag type="is-light">
                                {{ props.row.laravel_version }} / {{ props.row.php_version }}
                            </b-tag>
                        </b-taglist>
                    </td>
                </template>
                <template slot="empty">
                    <dashboard-empty></dashboard-empty>
                </template>
                <template slot="detail">
                    <dashboard-details></dashboard-details>
                </template>
            </dashboard-table>
        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';
    import DashboardTable from './dashboard/DashboardTable';
    import DashboardEmpty from './dashboard/DashboardEmpty';
    import DashboardFilter from './dashboard/DashboardFilter';
    import DashboardDetails from './dashboard/DashboardDetails';

    export default {
        components: {
            DashboardTable,
            DashboardEmpty,
            DashboardFilter,
            DashboardDetails,
        },
        computed: {
            ...mapGetters('trackers', {
                trackers: 'filtered',
                openedDetails: 'openedDetails',
            }),
        },
        data() {
            return {
                perPage: 15,
            };
        },
        methods: {
            rowClass() {
                return 'tracker-row';
            },
            rowClicked(row) {
                this.$store.commit('trackers/toggleOpenedDetails', row.id);
            },
        },
    };
</script>

<style lang="sass" scoped>
    h1
        font-size: 1.5rem

    nav
        &.is-fixed-top
            & + nav
                top: 4rem

    table
        .tag
            font-size: .78rem

        tbody
            tr
                &.tracker-row
                    td
                        cursor: pointer

                    td:nth-child(2),
                    td:nth-child(3),
                    td:nth-child(4),
                    td:nth-child(5)
                        width: 100px

                    td:nth-child(7)
                        width: 115px

                    td:nth-child(6)
                        .tag
                            white-space: nowrap
                            overflow: hidden
                            max-width: 150px
                            justify-content: flex-end
</style>

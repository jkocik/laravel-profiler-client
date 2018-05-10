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
                    <td-execution-at :tracker="props.row"></td-execution-at>
                    <td-env :tracker="props.row"></td-env>
                    <td-via :tracker="props.row"></td-via>
                    <td-type :tracker="props.row"></td-type>
                    <td-request-response :tracker="props.row"></td-request-response>
                    <td-version :tracker="props.row"></td-version>
                </template>
                <template slot="detail" slot-scope="props">
                    <dashboard-details :tracker="props.row"></dashboard-details>
                </template>
                <template slot="empty">
                    <dashboard-empty></dashboard-empty>
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
    import TdEnv from './dashboard/table/TdEnv';
    import TdVia from './dashboard/table/TdVia';
    import TdType from './dashboard/table/TdType';
    import TdVersion from './dashboard/table/TdVersion';
    import TdExecutionAt from './dashboard/table/TdExecutionAt';
    import TdRequestResponse from './dashboard/table/TdRequestResponse';

    export default {
        components: {
            DashboardTable,
            DashboardEmpty,
            DashboardFilter,
            DashboardDetails,
            TdEnv,
            TdVia,
            TdType,
            TdVersion,
            TdExecutionAt,
            TdRequestResponse,
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
            rowClicked(tracker) {
                this.$store.commit('trackers/toggleOpenedDetails', tracker.id);
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

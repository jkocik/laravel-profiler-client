<template>
    <section class="dashboard">
        <nav class="navbar is-fixed-top is-dark">
            <div class="navbar-brand container is-widescreen">
                <h1 class="navbar-item">
                    <b-icon
                        pack="fab"
                        icon="laravel"
                        size="is-medium"
                        type="is-light"
                    ></b-icon>
                    Laravel Profiler
                </h1>
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
                <template slot-scope="{ row }">
                    <td-execution-at :tracker="row"></td-execution-at>
                    <td-env :tracker="row"></td-env>
                    <td-via :tracker="row"></td-via>
                    <td-type :tracker="row"></td-type>
                    <td-request-response :tracker="row"></td-request-response>
                    <td-version :tracker="row"></td-version>
                </template>
                <template slot="detail" slot-scope="{ row }">
                    <dashboard-details :tracker="row" :key="row.id"></dashboard-details>
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

<style lang="sass" scoped src="./../css/app-dashboard-scoped.sass"></style>

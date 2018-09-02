<template>
    <b-dashboard-table
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
    >
        <template slot-scope="{ row }">
            <td>
                <div class="tags has-addons">
                    <span class="tag is-white">{{ $t('dashboard.at') }}</span>
                    <span class="tag">{{ row.executionAt }}</span>
                </div>
            </td>

            <td>
                <div class="tags has-addons">
                    <span class="tag is-white">env</span>
                    <span class="tag">{{ row.env }}</span>
                </div>
            </td>

            <td>
                <div class="tags has-addons">
                    <span class="tag is-white">{{ $t('dashboard.via') }}</span>
                    <span class="tag">{{ row.running }}</span>
                </div>
            </td>

            <td>
                <div class="tags has-addons">
                    <span class="tag is-light">{{ row.typeGroup }}</span>
                </div>
            </td>

            <td>
                <div class="tags has-addons">
                    <span class="tag" :class="[row.statusColor]">{{ row.status }}</span>
                    <span class="tag">{{ row.method }}</span>
                    <span class="tag">{{ row.path }}</span>
                </div>
            </td>

            <td>
                <div class="tracker-summary">
                    <div>
                        <i class="fas fa-clock has-text-primary"></i> {{ row.laravelExecutionTimeForHuman }}
                    </div>
                    <div :class="{ 'has-text-grey-lighter': row.isEnvTesting() }">
                        <i class="fas fa-hdd has-text-primary"></i> {{ row.memoryUsageForHuman }}
                    </div>
                    <div class="views" v-if="row.areViewsProvided()">
                        <i class="fas fa-eye has-text-primary"></i> {{ row.countViews() }}
                    </div>
                    <div class="events" v-if="row.areEventsProvided()">
                        <i class="fas fa-cog has-text-primary"></i> {{ row.countEvents() }}
                    </div>
                    <div class="queries" v-if="row.areQueriesProvided()">
                        <i class="fas fa-database has-text-primary"></i> {{ row.countQueries() }}
                    </div>
                </div>
            </td>

            <td>
                <div class="tags has-addons">
                    <span class="tag is-white">v</span>
                    <span class="tag">{{ row.laravelVersion }}</span>
                </div>
            </td>
        </template>

        <template slot="detail" slot-scope="{ row }">
            <dashboard-details :tracker="row" :key="row.id"></dashboard-details>
        </template>

        <template slot="empty">
            <dashboard-empty></dashboard-empty>
        </template>
    </b-dashboard-table>
</template>

<script>
    import { mapGetters } from 'vuex';
    import DashboardEmpty from './DashboardEmpty';
    import DashboardDetails from './DashboardDetails';
    import BDashboardTable from './../buefy/BDashboardTable';

    export default {
        name: 'dashboard-table',
        components: {
            DashboardEmpty,
            BDashboardTable,
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
            rowClicked(tracker) {
                this.$store.commit('trackers/toggleOpenedDetails', tracker.id);
            },
        },
    };
</script>

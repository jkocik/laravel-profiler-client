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

            <td class="tracker-summary">
                <div>
                    <i class="fas fa-clock has-text-primary"></i> {{ row.performance.laravelTimeForHuman }}
                </div>
            </td>
            <td class="tracker-summary memory">
                <div v-if="! row.isEnvTesting()">
                    <i class="fas fa-hdd has-text-primary"></i> {{ row.performance.memoryPeakForHuman }}
                </div>
                <div v-if="row.isEnvTesting()">
                    <i class="fas fa-hdd has-text-primary"></i> ------
                </div>
            </td>
            <td class="tracker-summary views">
                <div v-if="row.areViewsProvided()">
                    <i class="fas fa-eye has-text-primary"></i> {{ row.countViews() }}
                </div>
            </td>
            <td class="tracker-summary events">
                <div v-if="row.areEventsProvided()">
                    <i class="fas fa-cog has-text-primary"></i> {{ row.countEvents() }}
                </div>
            </td>
            <td class="tracker-summary queries">
                <div v-if="row.areQueriesProvided()">
                    <i class="fas fa-database has-text-primary"></i> {{ row.countQueries() }}
                </div>
            </td>
            <td class="tracker-summary redis">
                <div v-if="row.isRedisProvided()">
                    <i class="fas fa-coins has-text-primary"></i> {{ row.countRedis() }}
                </div>
            </td>
            <td class="tracker-summary auth has-text-centered">
                <div v-show="row.isAuthProvided() && row.hasAuth()">
                    <i class="fas fa-user has-text-success"></i>
                </div>
                <div v-show="row.isAuthProvided() && ! row.hasAuth()">
                    <i class="fas fa-user-slash has-text-grey-lighter"></i>
                </div>
            </td>

            <td class="tracker-summary exception has-text-centered">
                <div v-show="row.isExceptionProvided() && row.hasException()">
                    <i class="fas fa-exclamation-circle has-text-danger"></i>
                </div>
                <div v-show="row.isExceptionProvided() && ! row.hasException()">
                    <i class="fas fa-thumbs-up has-text-grey-lighter"></i>
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
            }),
            ...mapGetters('details', [
                'openedDetails',
            ]),
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
                this.$store.commit('details/toggleOpenedDetails', tracker.id);
            },
        },
    };
</script>

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
            </td>

            <td>
                <div class="tags has-addons">
                    <span class="tag is-white">v</span>
                    <span class="tag">{{ row.laravelVersion }} / {{ row.phpVersion }}</span>
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

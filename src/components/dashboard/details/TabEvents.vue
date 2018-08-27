<template>
    <section>
        <b-events-table
            :data="tracker.events"
            :narrowed="true"
            :hoverable="true"
            :paginated="true"
            per-page="100"
            :row-class="rowClass"
            detailed
            detail-key="index"
            :opened-detailed="openedDetails"
            @click="rowClicked"
        >
            <template slot-scope="{ row }">
                <td :class="{ 'has-not-details': ! row.hasDetails() }">
                    <span class="has-text-primary">{{ row.name }}</span>
                </td>
                <td :class="{ 'has-not-details': ! row.hasDetails() }">
                    <span v-if="row.isGrouped()">{{ $t('tabs.events.group', { times: row.count }) }}</span>
                </td>
            </template>

            <template slot="detail" slot-scope="{ row }">
                <tree-view
                    :data="row.data"
                    label="data"
                ></tree-view>
            </template>
        </b-events-table>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import BEventsTable from './../../buefy/BEventsTable';
    import { bTableService } from './../../../services/b-table.service';

    export default {
        name: 'tab-events',
        components: {
            BEventsTable,
        },
        props: {
            tracker: Tracker,
        },
        data() {
            return {
                openedDetails: [],
            };
        },
        methods: {
            rowClass() {
                return 'query-row';
            },
            rowClicked(event) {
                if (event.hasDetails()) {
                    bTableService.toggleOpenedDetails(this.openedDetails, event.index);
                }
            },
        },
    };
</script>

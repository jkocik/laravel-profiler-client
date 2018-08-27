<template>
    <section>
        <b-views-table
            :data="tracker.views"
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
                    <span class="has-text-primary">{{ row.label }}</span>
                </td>
            </template>

            <template slot="detail" slot-scope="{ row }">
                <tree-view
                    :data="row.data"
                    label="data"
                ></tree-view>
            </template>
        </b-views-table>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import BViewsTable from './../../buefy/BViewsTable';
    import { bTableService } from './../../../services/b-table.service';

    export default {
        name: 'tab-views',
        components: {
            BViewsTable,
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
            rowClicked(view) {
                if (view.hasDetails()) {
                    bTableService.toggleOpenedDetails(this.openedDetails, view.index);
                }
            },
        },
    };
</script>

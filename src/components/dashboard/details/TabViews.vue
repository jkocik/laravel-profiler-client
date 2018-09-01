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
                <td class="has-text-info">
                    {{ row.label }}
                </td>
                <td>
                    {{ $t('tabs.views.params', { params: row.countParams() }) }}
                </td>
            </template>

            <template slot="detail" slot-scope="{ row }">
                <tree-view
                    v-if="row.hasData()"
                    :data="row.data"
                    label="data"
                ></tree-view>
                <tree-view
                    v-if="row.hasParams()"
                    :data="row.params"
                    label="params types"
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
                bTableService.toggleOpenedDetails(this.openedDetails, view.index);
            },
        },
    };
</script>

<template>
    <section>
        <div class="header has-text-right">
            <strong>{{ tracker.queriesExecutionTimeForHuman }}</strong>
        </div>

        <b-queries-table
            :data="tracker.queries"
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
                <td>
                    <span class="has-text-primary">{{ row.query }}</span>
                </td>
                <td>
                    {{ row.database }}
                </td>
                <td>
                    {{ row.timeForHuman }}
                </td>
            </template>

            <template slot="detail" slot-scope="{ row }">
                <strong>query</strong>: {{ row.sql }}
                <tree-view
                    :data="row.bindings"
                    label="bindings"
                ></tree-view>
                <strong>connection</strong>: {{ row.name }}
            </template>
        </b-queries-table>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import BQueriesTable from './../../buefy/BQueriesTable';
    import { bTableService } from './../../../services/b-table.service';

    export default {
        name: 'tab-queries',
        components: {
            BQueriesTable,
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
            rowClicked(query) {
                bTableService.toggleOpenedDetails(this.openedDetails, query.index);
            },
        },
    };
</script>

<style lang="sass" src="./../../../css/tab-queries-scoped.sass" scoped></style>

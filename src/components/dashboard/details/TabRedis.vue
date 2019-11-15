<template>
    <section>
        <div class="header has-text-right">
            <strong>{{ tracker.redisExecutionTimeForHuman }}</strong>
        </div>

        <b-queries-table
            :data="tracker.redis"
            :narrowed="true"
            :hoverable="true"
            :paginated="true"
            per-page="100"
            :row-class="rowClass"
        >
            <template slot-scope="{ row }">
                <td>
                    <strong>{{ row.command }}</strong> => {{ row.parameters.join(', ') }}
                </td>
                <td>
                    {{ row.name }}
                </td>
                <td>
                    {{ row.timeForHuman }}
                </td>
            </template>
        </b-queries-table>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import BQueriesTable from './../../buefy/BQueriesTable';

    export default {
        name: 'tab-redis',
        components: {
            BQueriesTable,
        },
        props: {
            tracker: Tracker,
        },
        methods: {
            rowClass() {
                return 'query-row redis-row';
            },
        },
    };
</script>

<style lang="sass" src="./../../../css/tab-queries-scoped.sass" scoped></style>

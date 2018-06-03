<template>
    <b-table
        :data="tracker.request.serverForTable()"
        :narrowed="true"
        class="is-sub-tab"
    >
        <template slot-scope="props">
            <td>{{ props.row[0] }}</td>
            <td>{{ props.row[1] }}</td>
        </template>
    </b-table>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-http-request-server',
        props: {
            tracker: Tracker,
        },
    };
</script>

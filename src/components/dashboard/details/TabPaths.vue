<template>
    <b-table
        :data="tracker.paths"
        :narrowed="true"
        class="is-sub-tab"
    >
        <template slot-scope="props">
            <td>{{ props.row.nameForHuman }}</td>
            <td>{{ props.row.path }}</td>
        </template>
    </b-table>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-paths',
        props: {
            tracker: Tracker,
        },
    };
</script>

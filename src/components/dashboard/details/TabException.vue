<template>
    <section>
        <b-table
            :data="data"
            :narrowed="true"
            class="is-sub-tab"
        >
            <template slot-scope="props">
                <td>{{ props.row.label }}</td>
                <td>{{ props.row.item }}</td>
            </template>
        </b-table>
        <hr>
        <tree-view
            :data="tracker.exception.trace"
            label="trace"
        ></tree-view>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-exception',
        props: {
            tracker: Tracker,
        },
        data() {
            return {
                data: [
                    {
                        label: 'exception',
                        item: this.tracker.exception.exception,
                    },
                    {
                        label: 'message',
                        item: this.tracker.exception.message,
                    },
                    {
                        label: 'in',
                        item: `${this.tracker.exception.file}:${this.tracker.exception.line}`,
                    },
                ],
            };
        },
    };
</script>

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
            :data="tracker.response.headers"
            label="headers"
            :openFirstLevel="true"
        ></tree-view>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-http-response-summary',
        props: {
            tracker: Tracker,
        },
        data() {
            return {
                data: [
                    {
                        label: 'status',
                        item: this.tracker.status,
                    },
                    {
                        label: 'status text',
                        item: this.tracker.statusText,
                    },
                ],
            };
        },
    };
</script>

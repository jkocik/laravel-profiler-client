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
            :data="tracker.route.middleware"
            label="middleware"
        ></tree-view>
        <hr>
        <tree-view
            :data="tracker.route.parameters"
            label="parameters"
        ></tree-view>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-http-route',
        props: {
            tracker: Tracker,
        },
        data() {
            return {
                data: [
                    {
                        label: this.tracker.route.usesType,
                        item: this.tracker.route.uses,
                    },
                    {
                        label: 'form request',
                        item: this.tracker.route.formRequest,
                    },
                    {
                        label: 'methods',
                        item: this.tracker.route.methods,
                    },
                    {
                        label: 'uri',
                        item: this.tracker.route.uri,
                    },
                    {
                        label: 'name',
                        item: this.tracker.route.name,
                    },
                    {
                        label: 'prefix',
                        item: this.tracker.route.prefix,
                    },
                ],
            };
        },
    };
</script>

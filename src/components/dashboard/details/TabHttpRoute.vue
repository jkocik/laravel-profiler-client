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
            :options="optionsMiddleware"
        ></tree-view>
        <hr>
        <tree-view
            :data="tracker.route.parameters"
            :options="optionsParameters"
        ></tree-view>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import { treeViewService } from './../../../services/tree-view.service';

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
                        label: 'regex',
                        item: this.tracker.route.regex,
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
                optionsMiddleware: {
                    rootObjectKey: 'middleware',
                    maxDepth: treeViewService.maxDepthOf(this.tracker.route.middleware),
                },
                optionsParameters: {
                    rootObjectKey: 'parameters',
                    maxDepth: treeViewService.maxDepthOf(this.tracker.route.parameters),
                },
            };
        },
    };
</script>

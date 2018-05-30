<template>
    <section>
        <ul>
            <li><span><label>command</label></span> {{ tracker.path }}</li>
        </ul>
        <hr>
        <tree-view
            :data="request.arguments"
            :options="optionsArguments"
        ></tree-view>
        <hr>
        <tree-view
            :data="request.options"
            :options="optionsOptions"
        ></tree-view>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import { treeViewService } from './../../../services/tree-view.service';

    export default {
        name: 'tab-console-finished-request',
        props: {
            tracker: Tracker,
        },
        data() {
            return {
                request: this.tracker.request,
                optionsArguments: {
                    rootObjectKey: 'arguments',
                    maxDepth: treeViewService.maxDepthOf(this.tracker.request.arguments),
                },
                optionsOptions: {
                    rootObjectKey: 'options',
                    maxDepth: treeViewService.maxDepthOf(this.tracker.request.options),
                },
            };
        },
    };
</script>

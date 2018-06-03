<template>
    <tree-view
        :data="tracker.response.json"
        :options="optionsContentJson"
    ></tree-view>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import { treeViewService } from './../../../services/tree-view.service';

    export default {
        name: 'tab-http-response-json',
        props: {
            tracker: Tracker,
        },
        data() {
            return {
                optionsContentJson: {
                    rootObjectKey: 'content',
                    maxDepth: treeViewService.maxDepthOf(this.tracker.response.json),
                },
            };
        },
    };
</script>

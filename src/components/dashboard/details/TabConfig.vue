<template>
    <tree-view
        :data="tracker.config"
        :options="options"
    ></tree-view>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import { treeViewService } from './../../../services/tree-view.service';

    export default {
        name: 'tab-config',
        props: {
            tracker: Tracker,
        },
        data() {
            return {
                options: {
                    rootObjectKey: 'config',
                    maxDepth: treeViewService.maxDepthOf(this.tracker.config),
                },
            };
        },
    };
</script>

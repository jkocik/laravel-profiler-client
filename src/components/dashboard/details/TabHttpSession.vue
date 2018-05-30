<template>
    <tree-view
        :data="tracker.session"
        :options="options"
    ></tree-view>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import { treeViewService } from './../../../services/tree-view.service';

    export default {
        name: 'tab-http-session',
        props: {
            tracker: Tracker,
        },
        data() {
            return {
                options: {
                    rootObjectKey: 'session',
                    maxDepth: treeViewService.maxDepthOf(this.tracker.session),
                },
            };
        },
    };
</script>

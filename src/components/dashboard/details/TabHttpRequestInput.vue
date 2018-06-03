<template>
    <section>
        <tree-view
            :data="tracker.request.input"
            :options="optionsInput"
        ></tree-view>
        <hr>
        <tree-view
            :data="tracker.request.files"
            :options="optionsFiles"
        ></tree-view>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import TrueFalse from './../../partials/TrueFalse';
    import { treeViewService } from './../../../services/tree-view.service';

    export default {
        name: 'tab-http-request-input',
        props: {
            tracker: Tracker,
        },
        components: {
            TrueFalse,
        },
        data() {
            return {
                optionsInput: {
                    rootObjectKey: 'input',
                    maxDepth: treeViewService.maxDepthOf(this.tracker.request.input),
                },
                optionsFiles: {
                    rootObjectKey: 'files',
                    maxDepth: treeViewService.maxDepthOf(this.tracker.request.files, 3),
                },
            };
        },
    };
</script>

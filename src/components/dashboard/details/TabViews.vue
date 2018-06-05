<template>
    <section>
        <div v-for="(view, index) of tracker.views" :key="index">
            <tree-view
               :data="view.data"
               :options="options(view)"
            ></tree-view>
            <hr>
        </div>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import { treeViewService } from './../../../services/tree-view.service';

    export default {
        name: 'tab-views',
        props: {
            tracker: Tracker,
        },
        methods: {
            options(view) {
                return {
                    rootObjectKey: view.label,
                    maxDepth: treeViewService.maxDepthOf(view.data),
                };
            },
        },
    };
</script>

<style lang="sass" src="./../../../css/tab-views-scoped.sass" scoped></style>

<template>
    <tree-view
        :data="tracker.config"
        :options="options"
    ></tree-view>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-config',
        props: {
            tracker: Tracker,
        },
        data() {
            return {
                options: {
                    rootObjectKey: 'config',
                    maxDepth: 1,
                },
            };
        },
    };
</script>

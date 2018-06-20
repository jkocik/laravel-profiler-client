<template>
    <tree-view
        :data="tracker.config"
        label="config"
    ></tree-view>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-config',
        props: {
            tracker: Tracker,
        },
    };
</script>

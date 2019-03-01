<template>
    <tree-view
        :data="tracker.session"
        label="session"
        :openFirstLevel="true"
    ></tree-view>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-http-session',
        props: {
            tracker: Tracker,
        },
    };
</script>

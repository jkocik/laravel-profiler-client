<template>
    <tree-view
        :data="tracker.response.json"
        label="content"
    ></tree-view>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-http-response-json',
        props: {
            tracker: Tracker,
        },
    };
</script>

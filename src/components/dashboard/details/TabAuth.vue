<template>
    <tree-view
        :data="tracker.auth"
        label="user"
    ></tree-view>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-auth',
        props: {
            tracker: Tracker,
        },
    };
</script>

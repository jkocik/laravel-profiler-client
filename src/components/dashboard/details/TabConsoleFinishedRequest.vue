<template>
    <section>
        <ul>
            <li><span><label>command</label></span> {{ tracker.path }}</li>
        </ul>
        <hr>
        <tree-view
            :data="tracker.request.arguments"
            label="arguments"
        ></tree-view>
        <hr>
        <tree-view
            :data="tracker.request.options"
            label="options"
        ></tree-view>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-console-finished-request',
        props: {
            tracker: Tracker,
        },
    };
</script>

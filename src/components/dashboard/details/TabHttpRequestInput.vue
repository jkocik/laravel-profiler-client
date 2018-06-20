<template>
    <section>
        <tree-view
            :data="tracker.request.input"
            label="input"
        ></tree-view>
        <hr>
        <tree-view
            :data="tracker.request.files"
            label="files"
        ></tree-view>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import TrueFalse from './../../partials/TrueFalse';

    export default {
        name: 'tab-http-request-input',
        props: {
            tracker: Tracker,
        },
        components: {
            TrueFalse,
        },
    };
</script>

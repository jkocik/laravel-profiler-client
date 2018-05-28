<template>
    <ul>
        <li><span><label>exitCode</label></span> {{ tracker.status }}</li>
    </ul>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-console-finished-response',
        props: {
            tracker: Tracker,
        },
    };
</script>

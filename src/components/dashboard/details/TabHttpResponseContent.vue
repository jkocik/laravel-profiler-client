<template>
    <section>
        {{ tracker.response.content }}
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-http-response-content',
        props: {
            tracker: Tracker,
        },
    };
</script>

<style lang="sass" scoped>
    section
        white-space: pre-wrap
</style>

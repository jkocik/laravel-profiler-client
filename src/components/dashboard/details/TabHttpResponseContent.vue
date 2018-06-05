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

<style lang="sass" src="./../../../css/tab-http-response-content-scoped.sass" scoped></style>

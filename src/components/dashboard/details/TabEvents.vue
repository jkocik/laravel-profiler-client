<template>
    <section>
        <div v-for="(event, index) of tracker.events" :key="index">
            <tree-view
                :data="event.data"
                :label="event.name"
            ></tree-view>
        </div>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-events',
        props: {
            tracker: Tracker,
        },
    };
</script>

<template>
    <section>
        <div v-for="(view, index) of tracker.views" :key="index" class="tree-view">
            <tree-view
                :data="view.data"
                :label="view.label"
            ></tree-view>
        </div>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-views',
        props: {
            tracker: Tracker,
        },
    };
</script>

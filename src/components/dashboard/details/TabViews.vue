<template>
    <section>
        <div v-for="(view, index) of tracker.views" :key="index">
            <tree-view
               :data="view.data"
               :label="view.label"
            ></tree-view>
            <hr>
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

<style lang="sass" src="./../../../css/tab-views-scoped.sass" scoped></style>

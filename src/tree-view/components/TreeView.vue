<template>
    <section>
        <span>{{ label }}</span> <span class="desc">({{ count() }})</span>
        <tree-view-single-level
            :data="data"
        ></tree-view-single-level>
    </section>
</template>

<script>
    import TreeViewSingleLevel from './TreeViewSingleLevel';

    export default {
        components: {
            TreeViewSingleLevel,
        },
        name: 'tree-view',
        props: {
            data: [Array, Object],
            label: String,
        },
        methods: {
            count() {
                return Object.keys(this.data).length;
            },
        },
    };
</script>

<style lang="sass" src="./../css/tree-view-scoped.sass" scoped></style>

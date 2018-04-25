<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
    };
</script>

<style lang="sass">
    html
        font-size: 13px

        &.has-navbar-fixed-top
            padding-top: 7.5rem

    .has-hidden-thead table thead
        display: none

    .has-hidden-pagination-arrows
        .pagination-previous
            display: none

        .pagination-next
            display: none

    .pagination
        margin: 0
</style>

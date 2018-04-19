<template>
    <div id="app">
        <nav class="navbar is-fixed-top is-dark">
            <div class="navbar-brand container is-widescreen">
                <h1 class="navbar-item">Laravel Profiler</h1>
            </div>
        </nav>
        <nav class="navbar is-fixed-top">
            <div class="navbar-menu container is-widescreen">
                <div class="navbar-item"></div>
            </div>
        </nav>
        <router-view/>
    </div>
</template>

<script>
    export default {
    };
</script>

<style lang="sass" scoped>
    h1
        font-size: 1.5rem

    nav.is-fixed-top + nav
        top: 3.25rem
</style>

<style lang="sass">
    html
        font-size: 13px

        &.has-navbar-fixed-top
            padding-top: 6.5rem

    .has-hidden-thead table thead
        display: none
</style>

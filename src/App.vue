<template>
    <div id="app">
        <header class="is-fullwidth">
            <div class="container is-widescreen">
                <h1>Laravel Profiler</h1>
            </div>
        </header>
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

    #app
        & > header
            h1
                font-size: 1.2rem

            &.is-fullwidth
                padding: 10px 0
                color: hsl(0, 0%, 96%)
                background-color: hsl(0, 0%, 21%)
            .container
                padding: 0 10px

        .has-hidden-thead table thead
            display: none
</style>

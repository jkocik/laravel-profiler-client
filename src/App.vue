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
    #app > header
        &.is-fullwidth
            padding: 5px 0
            color: hsl(0, 0%, 96%)
            background-color: hsl(0, 0%, 21%)

        .container
            padding: 0 10px
</style>

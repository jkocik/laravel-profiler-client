<template>
    <div id="app">
        <app-header></app-header>
        <main>
            <router-view/>
        </main>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import AppHeader from './components/AppHeader';
    import AppFooter from './components/AppFooter';

    export default {
        name: 'app',
        components: {
            AppHeader,
            AppFooter,
        },
    };
</script>

<style lang="scss" src="./css/app-buefy-overrides.scss"></style>
<style lang="sass" src="./css/app.sass"></style>
<style lang="sass" src="./css/app-scoped.sass"></style>

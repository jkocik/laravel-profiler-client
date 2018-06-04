<template>
    <section class="dashboard">
        <nav class="navbar is-fixed-top is-dark">
            <div class="navbar-brand container is-widescreen">
                <h1 class="navbar-item">
                    <b-icon
                        pack="fab"
                        icon="laravel"
                        size="is-medium"
                        type="is-light"
                    ></b-icon>
                    Laravel Profiler
                </h1>
            </div>
        </nav>
        <nav class="navbar is-fixed-top">
            <dashboard-filter></dashboard-filter>
        </nav>
        <div class="container is-widescreen">
            <dashboard-table></dashboard-table>
        </div>
    </section>
</template>

<script>
    import DashboardTable from './dashboard/DashboardTable';
    import DashboardFilter from './dashboard/DashboardFilter';

    export default {
        name: 'app-dashboard',
        components: {
            DashboardTable,
            DashboardFilter,
        },
    };
</script>

<style lang="sass" scoped src="./../css/app-dashboard-scoped.sass"></style>

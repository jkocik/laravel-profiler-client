<template>
    <section class="container is-widescreen">
        <dashboard-filter></dashboard-filter>
        <dashboard-table></dashboard-table>
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

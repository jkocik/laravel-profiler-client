<template>
    <ul>
        <li v-for="(serviceProvider, index) of tracker.serviceProviders" :key="index">
            {{ serviceProvider }}
        </li>
    </ul>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'TabServiceProviders',
        props: {
            tracker: Tracker,
        },
    };
</script>

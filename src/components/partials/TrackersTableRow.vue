<template>
    <tr>
        <td>{{ tracker.id }}</td>
        <td>{{ tracker.version }}</td>
        <td>{{ tracker.env }}</td>
    </tr>
</template>

<script>
    import Tracker from './../../models/tracker';

    export default {
        props: {
            tracker: {
                type: Tracker,
            },
        },
    };
</script>

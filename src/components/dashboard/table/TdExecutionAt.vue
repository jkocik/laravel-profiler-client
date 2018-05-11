<template>
    <td>
        <b-taglist attached>
            <b-tag type="is-white">{{ $t('dashboard.at') }}</b-tag>
            <b-tag type="is-light">{{ tracker.executionAt }}</b-tag>
        </b-taglist>
    </td>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        props: {
            tracker: Tracker,
        },
    };
</script>

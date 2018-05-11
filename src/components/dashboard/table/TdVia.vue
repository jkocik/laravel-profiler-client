<template>
    <td>
        <b-taglist attached>
            <b-tag type="is-white">{{ $t('dashboard.via') }}</b-tag>
            <b-tag type="is-light">{{ tracker.running }}</b-tag>
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

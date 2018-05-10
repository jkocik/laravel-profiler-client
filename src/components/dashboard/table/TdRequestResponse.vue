<template>
    <td>
        <b-taglist attached>
            <b-tag :type="tracker.statusColor">{{ tracker.status }}</b-tag>
            <b-tag type="is-light">{{ tracker.method }}</b-tag>
            <b-tooltip
                    :label="tracker.path"
                    type="is-light"
                    position="is-bottom"
            >
                <b-tag type="is-light">{{ tracker.path }}</b-tag>
            </b-tooltip>
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

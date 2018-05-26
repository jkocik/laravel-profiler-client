<template>
    <span>
        <b-icon v-if="value"
            pack="fas"
            icon="check"
            size="is-small"
            type="is-dark"
        ></b-icon>
        <b-icon v-if="! value"
            pack="fas"
            icon="times"
            size="is-small"
            type="is-grey-lighter"
        ></b-icon>
    </span>
</template>

<script>
    export default {
        props: {
            value: Boolean,
        },
    };
</script>

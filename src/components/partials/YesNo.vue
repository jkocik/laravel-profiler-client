<template>
    <span>
        <b-tag v-if="value" type="is-light">yes</b-tag>
        <b-tag v-if="! value" type="is-light">no</b-tag>
    </span>
</template>

<script>
    export default {
        props: {
            value: Boolean,
        },
    };
</script>

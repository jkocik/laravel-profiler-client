<template>
    <ul>
        <li v-for="binding of tracker.bindings" :key="binding.abstract">
            {{ binding.abstract }}
            <span v-if="binding.resolved">
                <label>{{ $t('tabs.bindings.resolved-as') }}</label>
                {{ binding.resolved }}
            </span>
            <span v-if="! binding.resolved">
                <label>{{ $t('tabs.bindings.not-resolved') }}</label>
            </span>
        </li>
    </ul>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'TabBindings',
        props: {
            tracker: Tracker,
        },
    };
</script>

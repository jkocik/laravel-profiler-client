<template>
    <section>
        <p>
            <label>{{ $t('tabs.app.env') }}</label>
            {{ tracker.env }}
        </p>
        <p>
            <label>{{ $t('tabs.app.via') }}</label>
            {{ tracker.running }}
        </p>
        <p>
            <label>{{ $t('tabs.app.laravel-version') }}</label>
            {{ tracker.laravel_version }}
        </p>
        <p>
            <label>{{ $t('tabs.app.php-version') }}</label>
            {{ tracker.php_version }}
        </p>

        <h2>
            {{ $t('tabs.app.bindings') }} ({{ tracker.countBindings() }})
        </h2>
        <ul v-if="tracker.hasBindings()">
            <li v-for="binding of tracker.bindings" :key="binding.abstract">
                {{ binding.abstract }}
                <span v-if="binding.resolved">
                    <label>{{ $t('tabs.app.resolved-as') }}</label>
                    {{ binding.resolved }}
                </span>
                <span v-if="! binding.resolved">
                    <label>{{ $t('tabs.app.not-resolved') }}</label>
                </span>
            </li>
        </ul>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'TabApp',
        props: {
            tracker: Tracker,
        },
    };
</script>

<style lang="sass" scoped>
    h2
        margin: 25px 0 5px
        padding: 5px 0
        border-bottom: 1px dotted #bbb
        font-size: 0.8rem

    label
        font-size: 0.85rem
        color: #aaa
</style>

<template>
    <section>
        <p>
            <label>{{ $t('tabs.application.env') }}</label>
            {{ tracker.env }}
        </p>
        <p>
            <label>{{ $t('tabs.application.via') }}</label>
            {{ tracker.running }}
        </p>
        <p>
            <label>{{ $t('tabs.application.laravel-version') }}</label>
            {{ tracker.laravel_version }}
        </p>
        <p>
            <label>{{ $t('tabs.application.php-version') }}</label>
            {{ tracker.php_version }}
        </p>
        <p>
            <label>{{ $t('tabs.application.locale') }}</label>
            {{ tracker.application.locale }}
        </p>
        <p>
            <label>{{ $t('tabs.application.routes-are-cached') }}</label>
            <yes-no :value="tracker.application.routes_are_cached"></yes-no>
        </p>
        <p>
            <label>{{ $t('tabs.application.configuration-is-cached') }}</label>
            <yes-no :value="tracker.application.configuration_is_cached"></yes-no>
        </p>
        <p>
            <label>{{ $t('tabs.application.is-down-for-maintenance') }}</label>
            <yes-no :value="tracker.application.is_down_for_maintenance"></yes-no>
        </p>

        <h2>
            {{ $t('tabs.application.bindings') }} ({{ tracker.countBindings() }})
        </h2>
        <ul v-if="tracker.hasBindings()">
            <li v-for="binding of tracker.bindings" :key="binding.abstract">
                {{ binding.abstract }}
                <span v-if="binding.resolved">
                    <label>{{ $t('tabs.application.resolved-as') }}</label>
                    {{ binding.resolved }}
                </span>
                <span v-if="! binding.resolved">
                    <label>{{ $t('tabs.application.not-resolved') }}</label>
                </span>
            </li>
        </ul>
    </section>
</template>

<script>
    import YesNo from './../../partials/YesNo';
    import Tracker from './../../../models/tracker';

    export default {
        name: 'TabApplication',
        components: {
            YesNo,
        },
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

<template>
    <section>
        <ul>
            <li><span><label>command</label></span> {{ request.command }}</li>
        </ul>
        <hr>
        <tree-view
            :data="request.arguments"
            :options="optionsArguments"
        ></tree-view>
        <hr>
        <tree-view
            :data="request.options"
            :options="optionsOptions"
        ></tree-view>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';

    export default {
        name: 'tab-console-finished-request',
        props: {
            tracker: Tracker,
        },
        data() {
            return {
                request: this.tracker.request,
                optionsArguments: {
                    rootObjectKey: 'arguments',
                    maxDepth: 1,
                },
                optionsOptions: {
                    rootObjectKey: 'options',
                    maxDepth: 1,
                },
            };
        },
    };
</script>

<template>
    <section>
        <b-table
            :data="data"
            :narrowed="true"
            class="is-sub-tab"
        >
            <template slot-scope="props">
                <td>{{ props.row.label }}</td>
                <td v-if="! props.row.isBool">{{ props.row.item }}</td>
                <td v-if="props.row.isBool"><true-false :value="props.row.item"></true-false></td>
            </template>
        </b-table>
        <hr>
        <tree-view
            :data="request.query"
            :options="optionsQuery"
        ></tree-view>
        <hr>
        <tree-view
            :data="request.header"
            :options="optionsHeader"
        ></tree-view>
        <hr>
        <tree-view
            :data="request.cookie"
            :options="optionsCookie"
        ></tree-view>
    </section>
</template>

<script>
    import Tracker from './../../../models/tracker';
    import TrueFalse from './../../partials/TrueFalse';

    export default {
        name: 'tab-http-request-summary',
        props: {
            tracker: Tracker,
        },
        components: {
            TrueFalse,
        },
        data() {
            return {
                data: [
                    {
                        label: this.$t('tabs.http-request-summary.method'),
                        item: this.tracker.method,
                        isBool: false,
                    },
                    {
                        label: this.$t('tabs.http-request-summary.path'),
                        item: this.tracker.path,
                        isBool: false,
                    },
                    {
                        label: this.$t('tabs.http-request-summary.url'),
                        item: this.tracker.request.url,
                        isBool: false,
                    },
                    {
                        label: this.$t('tabs.http-request-summary.ip'),
                        item: this.tracker.request.ip,
                        isBool: false,
                    },
                    {
                        label: 'ajax',
                        item: this.tracker.request.ajax,
                        isBool: true,
                    },
                    {
                        label: 'json',
                        item: this.tracker.request.json,
                        isBool: true,
                    },
                    {
                        label: 'pjax',
                        item: this.tracker.request.pjax,
                        isBool: true,
                    },
                ],
                request: this.tracker.request,
                optionsQuery: {
                    rootObjectKey: 'query',
                    maxDepth: 1,
                },
                optionsHeader: {
                    rootObjectKey: 'header',
                    maxDepth: 2,
                },
                optionsCookie: {
                    rootObjectKey: 'cookie',
                    maxDepth: 1,
                },
            };
        },
    };
</script>

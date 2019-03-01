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
            :data="tracker.request.query"
            label="query"
        ></tree-view>
        <hr>
        <tree-view
            :data="tracker.request.cookie"
            label="cookie"
        ></tree-view>
        <hr>
        <tree-view
            :data="tracker.request.header"
            label="headers"
            :openFirstLevel="true"
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
                        label: 'method',
                        item: this.tracker.method,
                        isBool: false,
                    },
                    {
                        label: 'path',
                        item: this.tracker.path,
                        isBool: false,
                    },
                    {
                        label: 'url',
                        item: this.tracker.request.url,
                        isBool: false,
                    },
                    {
                        label: 'ip',
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
            };
        },
    };
</script>

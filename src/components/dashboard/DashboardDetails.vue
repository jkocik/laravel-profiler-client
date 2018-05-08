<template>
    <b-tabs
        :value="activeTab"
        @input="updateLastActiveDetailsTab"
        size="is-small"
        :animated="false"
    >
        <b-tab-item :label="$t('message.dashboard.details.tabs.app')">
            <details-app></details-app>
        </b-tab-item>
        <b-tab-item :label="$t('message.dashboard.details.tabs.request')">
            <details-request></details-request>
        </b-tab-item>
        <b-tab-item :label="$t('message.dashboard.details.tabs.response')">
            <details-response></details-response>
        </b-tab-item>
    </b-tabs>
</template>

<script>
    import DetailsApp from './details/DetailsApp';
    import DetailsRequest from './details/DetailsRequest';
    import DetailsResponse from './details/DetailsResponse';

    export default {
        components: {
            DetailsApp,
            DetailsRequest,
            DetailsResponse,
        },
        created() {
            this.activeTab = this.$store.state.trackers.lastActiveDetailsTab;
        },
        data() {
            return {
                activeTab: 0,
            };
        },
        methods: {
            updateLastActiveDetailsTab(activeTab) {
                this.$store.commit('trackers/updateLastActiveDetailsTab', activeTab);
            },
        },
    };
</script>

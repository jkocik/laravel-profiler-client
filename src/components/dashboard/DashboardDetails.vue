<template>
    <b-tabs :value="activeTab" @input="updateLastActiveDetailsTab" size="is-small" :animated="false">
        <b-tab-item :label="$t('message.dashboard.details.tabs.app')">
        </b-tab-item>
        <b-tab-item :label="$t('message.dashboard.details.tabs.request')">
        </b-tab-item>
        <b-tab-item :label="$t('message.dashboard.details.tabs.response')">
        </b-tab-item>
    </b-tabs>
</template>

<script>
    export default {
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

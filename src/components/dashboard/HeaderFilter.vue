<template>
    <div class="navbar-menu container is-widescreen">
        <div class="navbar-item">
            <b-field>
                <b-checkbox-button
                    v-for="env of allEnvs"
                    :key="env"
                    :native-value="env"
                    v-model="selectedEnvs"
                >
                    {{ env }}
                </b-checkbox-button>
            </b-field>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters('trackers', [
                'allEnvs',
            ]),
            selectedEnvs: {
                get() {
                    return this.$store.state.trackers.filter.env;
                },
                set(selectedEnvs) {
                    this.$store.commit('trackers/updateFilterEnv', selectedEnvs);
                },
            },
        },
    };
</script>

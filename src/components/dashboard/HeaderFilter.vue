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
        <div class="navbar-item">
            <b-field>
                <b-checkbox-button
                        v-for="version of allVersions"
                        :key="version"
                        :native-value="version"
                        v-model="selectedVersions"
                >
                    {{ version }}
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
                'allVersions',
            ]),
            selectedEnvs: {
                get() {
                    return this.$store.state.trackers.filter.env;
                },
                set(selectedEnvs) {
                    this.$store.commit('trackers/updateFilter', { env: selectedEnvs });
                },
            },
            selectedVersions: {
                get() {
                    return this.$store.state.trackers.filter.version;
                },
                set(selectedVersions) {
                    this.$store.commit('trackers/updateFilter', { version: selectedVersions });
                },
            },
        },
    };
</script>

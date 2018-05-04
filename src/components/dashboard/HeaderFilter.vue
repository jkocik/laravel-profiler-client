<template>
    <div class="navbar-menu container is-widescreen">
        <div class="navbar-item">
            <b-field>
                <b-checkbox-button
                        v-for="env of allEnvs"
                        :key="env"
                        :native-value="env"
                        v-model="selectedEnvs"
                        type="is-info"
                >
                    {{ env }}
                </b-checkbox-button>
            </b-field>
        </div>
        <div class="navbar-item">
            <b-field>
                <b-checkbox-button
                        v-for="running of allRunnings"
                        :key="running"
                        :native-value="running"
                        v-model="selectedRunnings"
                        type="is-info"
                >
                    {{ running }}
                </b-checkbox-button>
            </b-field>
        </div>
        <div class="navbar-item">
            <b-field>
                <b-checkbox-button
                        v-for="type of allTypes"
                        :key="type"
                        :native-value="type"
                        v-model="selectedTypes"
                        type="is-info"
                >
                    {{ type }}
                </b-checkbox-button>
            </b-field>
        </div>
        <div class="navbar-item">
            <b-field>
                <b-checkbox-button
                        v-for="method of allMethods"
                        :key="method"
                        :native-value="method"
                        v-model="selectedMethods"
                        type="is-info"
                >
                    {{ method }}
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
                'allRunnings',
                'allEnvs',
                'allTypes',
                'allMethods',
            ]),

            selectedRunnings: {
                get() {
                    return this.$store.state.trackers.filter.running;
                },
                set(selectedRunnings) {
                    this.$store.commit('trackers/updateFilter', { running: selectedRunnings });
                },
            },

            selectedEnvs: {
                get() {
                    return this.$store.state.trackers.filter.env;
                },
                set(selectedEnvs) {
                    this.$store.commit('trackers/updateFilter', { env: selectedEnvs });
                },
            },

            selectedTypes: {
                get() {
                    return this.$store.state.trackers.filter.type;
                },
                set(selectedTypes) {
                    this.$store.commit('trackers/updateFilter', { type: selectedTypes });
                },
            },

            selectedMethods: {
                get() {
                    return this.$store.state.trackers.filter.method;
                },
                set(selectedMethods) {
                    this.$store.commit('trackers/updateFilter', { method: selectedMethods });
                },
            },
        },
    };
</script>
